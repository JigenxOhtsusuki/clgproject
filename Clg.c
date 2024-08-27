import java.util.Scanner; 
public class OddEven
 { 
public static boolean isOddEven(int n)
 {
if(n % 2 == 0) 
return true; 
else 
return false;
 }
 public static void main(String[] args) 
{ 
 int number = 0;
 boolean result = false; 
 Scanner scan = new Scanner(System.in);
 System.out.print("Enter an integer number: "); 
 number = scan.nextInt(); 
 result=isOddEven(number); 
if(result)
{
System.out.println(number+" is an even number"); 
}
else 
{
System.out.println(number+" is an odd number"); 
 object scan.close();
 }
 }
}
