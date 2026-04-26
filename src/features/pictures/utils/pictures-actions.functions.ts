import { createServerFn } from '@tanstack/react-start';
import { uploadPictureInternal } from './pictures-actions.server';
import { getSessionInternal } from '../../auth/utils/auth-actions.server';

export const uploadPicture = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const session = await getSessionInternal();
    if (!session || session.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    return await uploadPictureInternal(data);
  });
