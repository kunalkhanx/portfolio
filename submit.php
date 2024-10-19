<?php
require 'config.php';

// URL of the API endpoint
$apiUrl = 'http://127.0.0.1:8000/api/data/2'; // Replace with your API URL

// Bearer token for authentication
$bearerToken = FORM_TOKEN; // Replace with your actual bearer token

// Check if there's any POST data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data and encode it as JSON
    $postData = json_encode($_POST);

    // Initialize cURL session
    $ch = curl_init($apiUrl);

    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $bearerToken,
        'Content-Type: application/json',
        'Accept: application/json',
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    // Execute the request and store the response
    $response = curl_exec($ch);

    // Check for any cURL errors
    if (curl_errno($ch)) {
        $error = ['error' => curl_error($ch)];
        echo json_encode($error);
    } else {
        // Get the HTTP status code
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // If the response is not OK (200), return an error message
        if ($httpCode !== 200) {
            $error = [
                'error' => 'Request failed',
                'status_code' => $httpCode,
                'response' => json_decode($response, true),
            ];
            echo json_encode($error);
        } else {
            // Output the API response
            echo $response;
        }
    }

    // Close the cURL session
    curl_close($ch);
} else {
    // Return an error if the request method is not POST
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
