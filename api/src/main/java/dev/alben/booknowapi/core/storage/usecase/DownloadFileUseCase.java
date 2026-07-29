package dev.alben.booknowapi.core.storage.usecase;

import java.io.FileNotFoundException;

/**
 * Use case to download a file from the cloud.
 */
public interface DownloadFileUseCase {
    /**
     * Search and get a file building a full path with the folder name and filename.
     *
     * @param folder   the folder name.
     * @param filename the file name.
     * @return bytes from the file found.
     * @throws FileNotFoundException if the file is not found.
     */
    byte[] downloadFile(String folder, String filename) throws FileNotFoundException;
}
