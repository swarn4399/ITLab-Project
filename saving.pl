#!C:\xampp\perl\bin\perl.exe

use strict;
use warnings;
use CGI;
use DBI;

print "Content-type: text/plain \n\n";
my $q = new CGI;
print $q->header( "text/html" );
print "These are the parameters I received:\n\n";
my $value = $q->param("POSTDATA");
#print " $value\n";



my $dbh = DBI->connect("DBI:mysql:myfiles",'root','');

die "failed to connect to MySQL database:DBI->errstr()" unless($dbh);

# prepare SQL statement
my $sth = $dbh->prepare("INSERT INTO save_files(data) VALUES ('$value')") or die "prepare statement failed: $dbh->errstr()";

$sth->execute() or die "execution failed: $dbh->errstr()"; 

my($no,$data);

# loop through each row of the result set, and print it
while(($no,$data) = $sth->fetchrow()){
   print("$no, $data\n");                   
}

$sth->finish();
$dbh->disconnect();

