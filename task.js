document.addEventListener("DOMContentLoaded", function () {
    // Получаем все элементы списка интересов
    const checkboxes = document.querySelectorAll(".interest__check");
  
    // Добавляем обработчик события для каждой галочки
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        // При изменении состояния галочки, вызываем функцию, которая обновит состояние всех вложенных галочек
        updateChildrenCheckboxes(this);
        // При изменении состояния галочки, вызываем функцию, которая обновит состояние всех родительских галочек
        updateParentCheckboxes(this);
      });
    });
  
    // Функция для обновления состояния всех вложенных галочек
    function updateChildrenCheckboxes(checkbox) {
      const parent = checkbox.closest(".interest");
      const childrenCheckboxes = parent.querySelectorAll(".interest__check");
  
      childrenCheckboxes.forEach((childCheckbox) => {
        childCheckbox.checked = checkbox.checked;
        childCheckbox.indeterminate = false;
      });
    }
  
    // Функция для обновления состояния всех родительских галочек
    function updateParentCheckboxes(checkbox) {
      const parent = checkbox.closest(".interest__parent");
  
      if (parent) {
        const parentCheckbox = parent.querySelector(".interest__check");
        const childCheckboxes = parent.querySelectorAll(".interest__check");
        let allChecked = true;
        let allUnchecked = true;
  
        childCheckboxes.forEach((childCheckbox) => {
          if (childCheckbox.checked) {
            allUnchecked = false;
          } else {
            allChecked = false;
          }
        });
  
        if (allChecked) {
          parentCheckbox.checked = true;
          parentCheckbox.indeterminate = false;
        } else if (allUnchecked) {
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = false;
        } else {
          parentCheckbox.indeterminate = true;
        }
  
        // Рекурсивно вызываем эту функцию для всех родительских уровней
        updateParentCheckboxes(parentCheckbox);
      }
    }
  });