<?php
require 'config.php';

$apiUrl = FORM_URL;

$bearerToken = FORM_TOKEN;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_encode($_POST);

    $ch = curl_init($apiUrl);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $bearerToken,
        'Content-Type: application/json',
        'Accept: application/json',
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);


    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $error = ['error' => curl_error($ch)];
        echo json_encode($error);
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode !== 200) {
            $error = [
                'error' => 'Request failed',
                'status_code' => $httpCode,
                'response' => json_decode($response, true),
            ];
            echo json_encode($error);
        } else {
            echo $response;
        }
    }

    curl_close($ch);
} else {
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
