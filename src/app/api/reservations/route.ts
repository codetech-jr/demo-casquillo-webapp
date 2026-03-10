import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clientName, date, time, itemsText, tableId } = body;

        if (!clientName || !date || !time || !tableId) {
            return NextResponse.json({ error: 'Faltan campos requeridos para la reserva' }, { status: 400 });
        }

        // Verificar si de casualidad la mesa ya fue reservada por otra persona (Race condition protection)
        const isAlreadyReserved = await prisma.reservation.findFirst({
            where: {
                tableId,
                date,
                status: { in: ['PENDING', 'CONFIRMED'] }
            }
        });

        if (isAlreadyReserved) {
            return NextResponse.json({ error: 'Lo sentimos, esta mesa acaba de ser reservada por alguien más.' }, { status: 409 });
        }

        // Crear la reserva en la base de datos
        const reservation = await prisma.reservation.create({
            data: {
                clientName,
                date,
                time,
                itemsText: itemsText || '',
                tableId
            }
        });

        return NextResponse.json({ success: true, reservation });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error interno guardando la reserva' }, { status: 500 });
    }
}
