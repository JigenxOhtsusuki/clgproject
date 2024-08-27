import java.util.*;
public class Facts {
public static void main(String args[])
 {
        int num, fact = 1, i;
        Scanner in = new Scanner(System.in);
        System.out.println("Enter any  Integer");
        num = in.nextInt();
        for (i = 1; i <= num; i++)
{
            fact = fact * i;
        }
        System.out.println ("!" + num + " = " + fact);
    }
}
 
