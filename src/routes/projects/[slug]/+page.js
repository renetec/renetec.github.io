import { projects } from '$lib/config';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    throw error(404, {
      message: 'Project not found'
    });
  }

  return {
    project
  };
}
