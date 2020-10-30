import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading, {
  loader: 'dots',
  color: '#5D00FF',
  zIndex: 999,
});

// Создадим пустую ссылку.
let loader = null;

// Показать прелоадер.
export function showLoader() {
  hideLoader();

  // Показываем прелоадер,
  // используя метод `show` самого плагина,
  // установленного глобально во Vue.
  loader = Vue.$loading.show();
}

// Скрыть прелоадер.
export function hideLoader() {
  // Если ссылка не пуста,
  // т.е. существует предыдущий прелоадер.
  if (loader) {
    // а) скрываем прелоадер,
    // используя метод `hide` компонента плагина.
    loader.hide();

    // б) удаляем ссылку на объект.
    loader = null;
  }
}