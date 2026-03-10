import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
        return NextResponse.json({ error: 'Falta proveer una fecha (date)' }, { status: 400 });
    }

    try {
        // Encontrar todas las mesas
        const allTables = await prisma.table.findMany();

        // Encontrar las reservas confirmadas o pendientes para la fecha dada
        const reservations = await prisma.reservation.findMany({
            where: {
                date: date,
                status: {
                    in: ['PENDING', 'CONFIRMED']
                }
            }
        });

        // Mapear qué mesas están ocupadas
        const reservedTableIds = new Set(reservations.map((r: { tableId: string }) => r.tableId));

        const mappedTables = allTables.map((table: { id: string }) => ({
            ...table,
            // Sobrescribimos el status de la DB con el "calculated status" según si está ocupada ese día
            status: reservedTableIds.has(table.id) ? 'occupied' : 'free',
        }));

        return NextResponse.json(mappedTables);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
