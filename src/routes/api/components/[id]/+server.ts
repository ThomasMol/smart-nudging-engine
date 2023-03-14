import prisma from '$lib/database';
import type { ComponentType } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const componentType: ComponentType = await prisma.componentType.findFirstOrThrow({
		include: {
			ComponentValue: true
		},
		where: { id: params.id }
	});
	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { label, dataType } = await request.json();
	if (!label || !dataType) {
		throw new Error('Missing required params');
	}
	const id = params.id;
	const componentType: ComponentType = await prisma.componentType.update({
		where: { id },
		data: {
			label,
			data_type: dataType
		},
		include: {
			ComponentValue: true
		}
	});

	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.componentType.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
