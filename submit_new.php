<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';



if(isset($_POST['password']) && $_POST['email'])
{
  $email=$_POST['email'];
  $pass = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    if (strlen($pass) != 128) {
        // The hashed pwd should be 128 characters long.
        // If it's not, something really odd has happened
        $error_msg .= '<p class="error">Invalid password configuration.</p>';
    }
  // echo "{$email}  ";
   $sql= "SELECT * FROM members WHERE email='".$email."'";
   $select=$mysqli->query($sql); 
   while($row=mysqli_fetch_array($select))
    {
      $random_salt=($row['salt']);
      break;
    }

  $pass=hash('sha512', $pass);
  
  $saltedpass = hash('sha512', $pass . $random_salt);
  
  $sql= "update members set password='".$saltedpass."' WHERE email='".$email."'";
   $select=$mysqli->query($sql); 
   echo "Password reset done";	?>
   <p> <a href="./index.php">Go to Login Page</a>.</p>
   <?php
   
}
?>