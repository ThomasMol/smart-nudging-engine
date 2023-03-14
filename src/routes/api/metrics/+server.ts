import type { RequestHandler } from './$types';
import type {  MetricType } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const metricTypes: MetricType[] = await prisma.metricType.findMany();
	return new Response(JSON.stringify(metricTypes));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { label, type } = await request.json();
	if (!label || !type) {
		throw new Error('Missing required parameters');
	}

	const metricType: MetricType = await prisma.metricType.create({
		data: {
			label,
			type
		}
	});
	return new Response(JSON.stringify(metricType));
}) satisfies RequestHandler;
