package dev.alben.booknowapi.core.storage;

import com.google.cloud.storage.Bucket;
import dev.alben.booknowapi.core.storage.usecase.DownloadFileUseCase;
import dev.alben.booknowapi.core.storage.usecase.UploadFileUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageService implements UploadFileUseCase, DownloadFileUseCase {
    private final Bucket bucket;

    @Override
    public String uploadFile(String folder, MultipartFile file) throws IOException {
        final var date = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss-SSS"));
        final var key = UUID.randomUUID().toString().substring(0, 5);
        final var filename = folder + "/" + date + "-" + key + "-" + file.getOriginalFilename();

        final var blob = bucket.create(filename, file.getBytes(), file.getContentType());

        return blob.getName();
    }

    @Override
    public byte[] downloadFile(String folder, String filename) throws FileNotFoundException {
        final var path = folder + "/" + filename;
        final var blob = bucket.get(path);

        if (blob == null) {
            throw new FileNotFoundException("File not found: " + filename);
        }

        return blob.getContent();
    }
}
