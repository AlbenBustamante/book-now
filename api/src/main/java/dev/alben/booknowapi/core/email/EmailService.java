package dev.alben.booknowapi.core.email;

import dev.alben.booknowapi.core.email.usecase.SendHtmlEmailUseCase;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EmailService implements SendHtmlEmailUseCase {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendHtmlEmail(String to, String subject, String title, String body) {
        final var message = javaMailSender.createMimeMessage();
        final var date = Instant.now();
        final var year = DateTimeFormatter.ofPattern("yyyy").format(date);

        try {
            message.setFrom(new InternetAddress(from));
            message.setRecipients(MimeMessage.RecipientType.TO, to);
            message.setSubject(subject);

            final var content = "<div style='padding: 12px 20px; background-color: #00b8db; border-radius: 25px;'>" +
                    "<h1 style='font-weight: 600; font-size: 20px; text-align: center; color: #fff; width: 100%;'>" +
                    title +
                    "</h1>" +
                    "<div style='margin: 12px 0; font-size: 18px; color: #fff'>" +
                    body +
                    "</div>" +
                    "<footer style='font-weight: 600; font-size: 16px; text-align: center; color: #fff;'>BookNow &copy; 2025 - " + year + "</footer>" +
                    "</div>";

            message.setContent(content, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            throw new EmailSenderException(e.getMessage());
        }

        javaMailSender.send(message);
    }
}
