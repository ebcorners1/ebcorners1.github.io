<?php
$name = $_POST['name'];
$email = $_POST['eMail'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$formcontent=" From: $name \n Phone: $phone  \n Message: $message";
$recipient = "exploring.behind.corners@gmail.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!" . " -" . "<a href='index_DE_3_1.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
?>
