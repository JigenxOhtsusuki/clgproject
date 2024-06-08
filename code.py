# Import Module
import tkinter
from tkinter import *
from PIL import Image, ImageTk
from tkinter import ttk
from tkinter import messagebox

# Create Tkinter Object
root = Tk()
root.geometry("1200x600")
root.title("Fenix")

# create label and add resize image
image1 = Image.open("image.png")
resize_image = image1.resize((70, 70))
img = ImageTk.PhotoImage(resize_image)
label1 = Label(image=img)
label1.image = img
label1.pack()
label1.place(x=30, y=30)

# name label
name = Label(text="Name:", font=("arial black", 15,"bold"))
name.place(x=30, y=130)

# Create a rounded corner style for the name Entry widget
style = ttk.Style()
style.theme_use('clam')  # Choosing a theme for the style
style.configure('Rounded.TEntry', borderwidth=1, relief="solid", foreground="black", background="white",
                fieldbackground="white", bordercolor="light grey")

name_textfield = ttk.Entry(root, style='Rounded.TEntry')
name_textfield.place(x=109, y=134, width=200, height=30)

# branch label
branch = Label(text="Branch:", font=("arial black", 15,"bold"))
branch.place(x=325, y=130)

# Create a rounded corner style for the branch Entry widget
style = ttk.Style()
style.theme_use('clam')  # Choosing a theme for the style
style.configure('Rounded.TEntry', borderwidth=1, relief="solid", foreground="black", background="white",
                fieldbackground="white", bordercolor="light grey")

branch_textfield = ttk.Entry(root, style='Rounded.TEntry')
branch_textfield.place(x=420, y=134, width=200, height=30)

def button_clicked():
    global canvas_bg  # Use the global canvas_bg variable

    # Check if both name and branch are entered
    name_value = name_textfield.get()
    branch_value = branch_textfield.get()
    button.destroy()

    if name_value and branch_value:
        # Create a small canvas for the background layer
        canvas_bg = tkinter.Canvas(root, width=500, height=450, bg="lightgray", highlightthickness=0)
        canvas_bg.place(x=30, y=170)

        # Display name and branch labels on the canvas
        lname = Label(canvas_bg, text="Name:", font=("sans", 12))
        lname.place(x=20, y=10)
        lname.config(bg="lightgray")

        name2 = Label(canvas_bg, text=name_value, font=("sans", 12))
        name2.place(x=80, y=10)
        name2.config(bg="lightgray")

        lbranch = Label(canvas_bg, text="Branch:", font=("sans", 12))
        lbranch.place(x=20, y=40)
        lbranch.config(bg="lightgray")

        branch2 = Label(canvas_bg, text=branch_value, font=("sans", 12))
        branch2.place(x=80, y=40)
        branch2.config(bg="lightgray")

        # Add labels and entry boxes for five subjects
        subjects = ["Subject1", "Subject2", "Subject3", "Subject4", "Subject5"]
        for i, subject in enumerate(subjects):
            subject_label = Label(root, text=f"{subject}:", font=("arial black", 15, "bold"))
            subject_label.place(x=650, y=130 + 40 * i)

            marks_entry = ttk.Entry(root, style='Rounded.TEntry')
            marks_entry.place(x=770, y=130 + 40 * i, width=200, height=30)
            marks_entries.append(marks_entry)

        # Add a submit button
        submit_button = tkinter.Button(root, text="Submit", command=lambda: submit_clicked(marks_entries))
        submit_button.place(x=1150, y=530)

    else:
        # Show error message in red
        error_label = Label(root, text="Please enter both name and branch", fg="red")
        error_label.place(x=30, y=530)


def submit_clicked(marks_entries):
    global canvas_bg  # Use the global canvas_bg variable

    # Display marks for each subject
    subjects = ["Subject1", "Subject2", "Subject3", "Subject4", "Subject5"]
    total_marks = 0
    for i, subject in enumerate(subjects):
        marks = marks_entries[i].get()  # Get marks entered for the current subject
        marks_label = Label(canvas_bg, text=f"{subject}: {marks}", font=("sans", 12))
        marks_label.place(x=20, y=70 + 30 * i)
        marks_label.config(bg="lightgray")
        total_marks += int(marks)

    # Calculate average
    average = total_marks / len(subjects)

    # Display average on the canvas
    avg_label = Label(canvas_bg, text=f"Average: {average:.2f}", font=("sans", 12))
    avg_label.place(x=20, y=70 + 30 * len(subjects))  # Place below the subject marks
    avg_label.config(bg="lightgray")

    if average >= 65 and average <75 :
        messagebox.showinfo(title="marks submitted",message="good, but try atleast for 80")
    elif average >= 75 and average<85 :
        messagebox.showinfo(title="marks submitted",message="better, but try atleast for 90")
    elif average >= 85 and average<100 :
        messagebox.showinfo(title="marks submitted",message="excellent, keep it up")
    elif average >= 45 and average<65 :
        messagebox.showinfo(title="marks submitted",message="need to improve")
    else:
        messagebox.showinfo(title="marks submitted",message="you've failed")

# Create an empty list to hold marks entries
marks_entries = []


# Load the image
image3 = Image.open("next2.png")
image3_r = image3.resize((60,60))
photo = ImageTk.PhotoImage(image3_r)
# Create a button with the image
button = tkinter.Button(root, image=photo, command=button_clicked, bd=0, highlightthickness=0)
button.configure(activebackground=button.cget('background'))
button.place(x=1150, y=530)
root.mainloop()
