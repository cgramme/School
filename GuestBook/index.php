<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Guest Book</title>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	<link rel='stylesheet' href='style.css' media="screen">
	<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:400|Open+Sans+Condensed:300,700' type='text/css' async>
</head>
<body>
	<h1>Guest Book</h1>
	<?php
		if (isset($_POST['save'])) {
			if(strlen($_POST['name']) > 0 && strlen($_POST['email']) > 0){
				$MultiArray = array();
				if(file_exists("guest_entries.txt")){
					$FileContents = file("guest_entries.txt");
					for ($i=0; $i<count($FileContents); ++$i) {
						$MemberList = explode("~", $FileContents[$i]);
						$MultiArray[$i] = array($MemberList[0], $MemberList[1]);
					}
				}
				//Check if name already exists
				if(in_array($_POST['name'], array_column($MultiArray, 0))){
					echo "Name already exists<br>";
				}else{
					$Name = stripslashes($_POST['name']);
		 			$Email = stripslashes($_POST['email']);
		 			$MessageRecord = "$Name~$Email\n";
		 			$MessageFile = fopen("guest_entries.txt", "ab");
		 			if ($MessageFile === FALSE)
		 				echo "There was an error saving your entry!\n";
		 			else {
		 				fwrite($MessageFile, $MessageRecord);
		 				fclose($MessageFile);
		 				echo "Your entry has been saved.\n";
		 			}
				}
			}else
				echo "All fields need to be entered.\n";
		}
	?>

	<h2>Save Your Info</h2>
	<form action="index.php" method="POST">
		Your name:<br>
		<input type="text" name="name" /><br />
		your email:<br>
		<input type="text" name="email" /><br />
		<br />
		<input type="submit" name="save" value="Submit" /><br />
	</form>
	<br>
	<h2>Guest Book Entries</h2>
	<table>
		<tr>
			<th>name</th>
			<th>email</th>
		</tr>
		<?php
			if ((!file_exists("guest_entries.txt")) || (filesize("guest_entries.txt") == 0))
 				echo "<p>There are no guest entries yet.</p>\n";
			else {
 				$MessageArray = file("guest_entries.txt");
 				sort($MessageArray);
 				$count = count($MessageArray);
 				$MultiArray = array();
 				for ($i = 0; $i < $count; ++$i) {
 					$CurrMsg = explode("~", $MessageArray[$i]);
 					$MultiArray[$i] = array(htmlentities($CurrMsg[0]), htmlentities($CurrMsg[1]));	
				}
				//Delete duplicate entries in array and replace file.
				$UniqueArray = array_unique($MultiArray, SORT_REGULAR);
				$UniqueArray = array_values($UniqueArray);
				$ArrayText = "";
				foreach($UniqueArray as $key => $secArray){
					$ArrayText .= implode('~', $secArray);
				}
				$NewFile = fopen("guest_entries.txt", "wb");
	 			if (!$NewFile === FALSE){
	 				fwrite($NewFile, $ArrayText);
	 				fclose($NewFile);
	 			}
	 			//Display guest book entries
	 			$MessageArray2 = file("guest_entries.txt");
 				$count2 = count($MessageArray2);
 				for ($i = 0; $i < $count2; ++$i) {
 					$CurrMsg2 = explode("~", $MessageArray2[$i]);
 					echo "<tr><td>" . htmlentities($CurrMsg2[0]) . "</td>";
 					echo "<td>" . htmlentities($CurrMsg2[1]) . "</td></tr>";
				}
			}
		?>
	</table>
</body>
</html>
