<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = "tls";
$mail->Username = 'dumpweed10@gmail.com'; // SMTP username
$mail->Password = 'dadr pwhs jitw awqp '; // SMTP password dadr pwhs jitw awqp 

$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('en', 'phpmailer/language/');
$mail -> IsHTML(true);
$mail -> setFrom('dynamicbeats4@gmail.com'); // От кого
$mail -> addAddress('ed.shander@mail.ru');
$mail -> Subject = 'Question for Dynamic Beats';

$name = $_POST['name'];
$email = $_POST['mail'];
$question = $_POST['message'];

// Тело письма
$body = '<h1>New question</h1><br>'.'<b>Name:</b> '.$name.'<br>'.'<b>Email:</b> '.$email.'<br>'.'<p>'.$question.'</p>';

$mail -> Body = $body;

if (!$mail -> send()) {
  $message = 'Error';
} else {
  $message = 'Success!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>