import { pipeline, env } from '@xenova/transformers';

// Configuration for Transformers.js in Node.js environment
env.localModelPath = './models';
env.allowRemoteModels = true;

const MODEL_ID = 'Xenova/all-MiniLM-L6-v2';

class PipelineSingleton {
  static task = 'feature-extraction' as const;
  static model = MODEL_ID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static instance: any = null;

  static async getInstance(progress_callback?: (progress: unknown) => void) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

/**
 * Generate a 384-dimensional vector embedding for the given text.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const embedder = await PipelineSingleton.getInstance();
    // 'pooling': 'mean' and 'normalize': true are standard for sentence embeddings
    const output = await embedder(text, { pooling: 'mean', normalize: true });
    // Convert Float32Array to standard array
    return Array.from(output.data);
  } catch (error) {
    console.error('Failed to generate embedding:', error);
    throw error;
  }
}
