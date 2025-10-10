package dev.alben.booknowapi.core.email.usecase;

/**
 * Use case to send emails as an {@code HTML} template.
 */
public interface SendHtmlEmailUseCase {
    /**
     * Sends an email using {@code HTML}.
     *
     * @param to      email address receiver.
     * @param subject email subject.
     * @param title   email title.
     * @param body    email content using {@code HTML}.
     */
    void sendHtmlEmail(String to, String subject, String title, String body);
}
