document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // دالة لتحميل المهام من Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' تشير لعدم الحفظ مرة تانية
    }

    // الدالة اللي بتضيف مهمة جديدة
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("من فضلك، اكتب مهمة!");
            return;
        }

        // إنشاء عنصر li جديد
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // إنشاء زرار جديد لحذف المهمة
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // نص الزرار
        removeButton.classList.add('remove-btn'); // إضافة فئة جديدة للزرار

        // إضافة حدث onclick للزرار
        removeButton.onclick = function() {
            taskList.removeChild(newTask); // حذف عنصر li من القائمة
            saveTasks(); // حفظ المهام بعد الحذف
        };

        // إضافة الزرار الجديد لعنصر li
        newTask.appendChild(removeButton);
        // إضافة عنصر li للقائمة
        taskList.appendChild(newTask);

        // مسح القيمة من خانة الإدخال
        if (save) {
            saveTasks(); // حفظ المهمة في Local Storage
        }
    }

    // دالة لحفظ المهام في Local Storage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.getElementsByTagName('li');
        for (let item of taskItems) {
            tasks.push(item.firstChild.textContent); // إضافة النص المكتوب في li للمصفوفة
        }
        localStorage.setItem('tasks', JSON.stringify(tasks)); // حفظ المهام في Local Storage
    }

    // إضافة مستمع حدث للزرار لتشغيل دالة addTask عند الضغط عليه
    addButton.addEventListener('click', () => addTask());

    // إضافة مستمع حدث لمفتاح "Enter" في خانة الإدخال
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // استدعاء الدالة إذا كان المفتاح Enter
        }
    });

    // تحميل المهام عند بدء التشغيل
    loadTasks();

    console.log('الصفحة اتحملت وكل العناصر اتخزنت');
});