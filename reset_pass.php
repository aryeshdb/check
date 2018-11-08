<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';  

if($_GET['key'] && $_GET['reset'])
{
  $email=$_GET['key'];
  $pass=$_GET['reset'];
  if ($mysqli->connect_error) {
     // echo "UNable to connect";
    header("Location: ../error.php?err=Unable to connect to MySQL");
    exit();
  }
  $sql= "SELECT * FROM members WHERE email='".$email."' and password='".$pass."'";
     $select=$mysqli->query($sql);   
  if(mysqli_num_rows($select)==1)
  {
    // echo "\ntrue";
    ?>
    <form method="post" action="submit_new.php">
    <input type="hidden" name="email" value="<?php echo $email;?>">
    <p>Enter New password</p>
    <input type="password" name='password'>
    <input type="submit" name="submit_password">
    </form>
    <?php
  }
  else{
    echo "No such user exists. Please check your Email Address"; 
  }
}
?>