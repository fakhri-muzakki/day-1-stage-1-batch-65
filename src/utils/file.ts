import fs from 'fs/promises';
import path from 'path';

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const fullPath = path.join(process.cwd(), 'src/public', filePath);
    console.log(fullPath);

    await fs.access(fullPath); // cek apakah file ada
    await fs.unlink(fullPath); // hapus file
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return;
    }

    throw error;
  }
};
