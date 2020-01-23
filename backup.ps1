Param($server, $account, $password, $name, $path)

echo "Connecting to $server..."
Set-Item WSMan:\localhost\Client\TrustedHosts -Value $server -Force
$password = ConvertTo-SecureString -AsPlainText $password -Force
$credential = New-Object System.Management.Automation.PSCredential -ArgumentList $account, $password
$session = New-PSSession -ComputerName $server -Credential $credential

echo "Backup $name to $path..."
Invoke-Command -Session $session -ScriptBlock {
  Param($name, $path)
  $time = Get-Date -Format 'yyyyMMddHHmmss'
  cmd /c "mysqldump $name > $path\$time.sql"
} -ArgumentList $name, $path

Remove-PSSession -Session $session
echo 'Done'
