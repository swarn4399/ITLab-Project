#!C:\xampp\perl\bin\perl.exe
use strict;
use warnings;
use CGI;
use DBI;
use LWP::Simple;

my $q = new CGI;
print $q->header( "text/plain" );
my $value = $q->param("GETDATA");
#print " $value\n";

my $dbh = DBI->connect("DBI:mysql:myfiles",'root','');
die "failed to connect to MySQL database:DBI->errstr()" unless($dbh);
# prepare SQL statement
my $sth = $dbh->prepare("SELECT * FROM save_files WHERE no='$value'") or die "prepare statement failed: $dbh->errstr()";
$sth->execute() or die "execution failed: $dbh->errstr()"; 
# loop through each row of the result set, and print it
my $data = $sth->fetchrow();
print $data."\n";

$sth->finish();
$dbh->disconnect();
