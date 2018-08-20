<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';



if(isset($_POST['password']) && $_POST['email'])
{
  $email=$_POST['email'];
  $pass=$_POST['password'];
  //echo "{$email}";
   $sql= "SELECT * FROM members WHERE email='".$email."'";
   $select=$mysqli->query($sql); 
   while($row=mysqli_fetch_array($select))
    {
      $random_salt=($row['salt']);
      break;
    }

    echo "{$pass}";
    echo "{$random_salt}";
    
  $saltedpass = hash('sha512', $pass . $random_salt);
  echo "{$saltedpass}";
  $sql= "update members set password='".$saltedpass."' WHERE email='".$email."'";
  //echo "{$sql}";
   //$select=$mysqli->query($sql); 
   echo "password reset done";	
}
?>