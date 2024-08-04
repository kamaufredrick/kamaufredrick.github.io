<?php
header('Content-Type: application/json');

$response = [
    'success' => '',
    'errors' => []
];

// Validate and sanitize input
if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
    $response['errors'][] = 'All fields are required.';
} else {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['errors'][] = 'Invalid email address.';
    }

    if (empty($response['errors'])) {
        // Prepare email
        $to = 'fredi.kamau@gmail.com';
        $subject = 'Contact Form Submission';
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send email
        if (mail($to, $subject, $body)) {
            $response['success'] = 'Your message has been sent successfully.';
        } else {
            $response['errors'][] = 'Failed to send email. Please try again later.';
        }
    }
}

echo json_encode($response);
?>
