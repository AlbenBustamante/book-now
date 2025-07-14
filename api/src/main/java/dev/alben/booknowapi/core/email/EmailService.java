package dev.alben.booknowapi.core.email;

import dev.alben.booknowapi.core.email.usecase.SendHtmlEmailUseCase;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements SendHtmlEmailUseCase {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendHtmlEmail(String to, String subject, String title, String body) {
        final var message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(from));
            message.setRecipients(MimeMessage.RecipientType.TO, to);
            message.setSubject(subject);

            final var content = "<div style='padding: 12px; background-color: #ccc; width: 100%;'>" +
                    "<h1 style='font-weight: 600; font-size: 20px; text-align: center; color: #333;'>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<div style='margin: 12px 0';>" +
                    body +
                    "</div>" +
                    "<footer style='font-weight: 600; font-size: 16px; text-align: center; color: #777;'>BookNow &copy; 2025</footer>" +
                    "</div>";

            message.setContent(content, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            throw new EmailSenderException(e.getMessage());
        }

        javaMailSender.send(message);
    }
}
