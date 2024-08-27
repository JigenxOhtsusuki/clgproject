import java.util.*;
public class Factr {
    public static void main(String args[]) {
        int num, fact = 1, i;
        Scanner in = new Scanner(System.in);
        System.out.println("Enter an Integer");
        num = in.nextInt();
        factorial = getfactorial(num); // Method Declaration
        System.out.println("!" + num + " = " + fact);
}
public static int getfactorial(int num)
 // Method Implementation
{  
        if (num <= 1)
            return 1;
        return  num * getfactorial(num-1);
    }
}
