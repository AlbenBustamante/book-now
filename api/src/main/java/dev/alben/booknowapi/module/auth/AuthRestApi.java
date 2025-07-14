package dev.alben.booknowapi.module.auth;

import dev.alben.booknowapi.core.email.usecase.SendHtmlEmailUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(path = "/auth")
@RestController
public class AuthRestApi {
    private final SendHtmlEmailUseCase sendHtmlEmailUseCase;

    @GetMapping
    public ResponseEntity<Void> sendEmail() {
        String content = "<p>Thanks for registering!</p>" +
                "<p>Please, verify your account using the following link:<p/><a href='https://www.google.com'>Google</a>";
        sendHtmlEmailUseCase.sendHtmlEmail("test@gmail.com", "Pretty Email", "BookNow", content);
        return ResponseEntity.ok().build();
    }
}
