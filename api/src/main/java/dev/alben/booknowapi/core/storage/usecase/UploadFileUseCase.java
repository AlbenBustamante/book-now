package dev.alben.booknowapi.core.storage.usecase;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Use case to upload a new file to the cloud.
 */
public interface UploadFileUseCase {
    /**
     * Upload a new file.
     *
     * @param folder the folder name where the file will be saved.
     * @param file   the file name.
     * @return the full file name.
     * @throws IOException if something goes wrong.
     */
    String uploadFile(String folder, MultipartFile file) throws IOException;
}
