import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})

export class MyfilterPipe implements PipeTransform {
  
  notTouchProducts: any = [];
  transform(items: any[], searchStr: string, type: string, count: boolean): any[] {
    let filterItems = items;
    if (searchStr === '') {

      if (count) {
        filterItems = items.filter(
          (item) => (item.count > 0) 
        );
      }

        if (type == 'Сортировка по цене (по убыванию)'){
          filterItems.sort((prev, next) => next.price - prev.price);

        } else 
            if (type == 'Сортировка по количеству (по возрастанию)') {
              filterItems.sort((prev, next) => prev.count - next.count);

        } else 
            if (type == 'Сортировка по количеству (по убыванию)') {
              filterItems.sort((prev, next) => next.count - prev.count);
        } else 
          if (type == 'Сортировка по цене (по возрастанию)') {
            filterItems.sort((prev, next) => prev.price - next.price);
          }
        return filterItems;
    } else {
      filterItems = items.filter(
        (item) => (item.category.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) 
      );

      if (count) {
        filterItems = items.filter(
          (item) => (item.count > 0) 
        );
      }

      if (type == 'Сортировка по цене (по убыванию)'){
          filterItems.sort((prev, next) => next.price - prev.price);

        } else 
            if (type == 'Сортировка по количеству (по возрастанию)') {
              filterItems.sort((prev, next) => prev.count - next.count);

        } else 
            if (type == 'Сортировка по количеству (по убыванию)') {
              filterItems.sort((prev, next) => next.count - prev.count);
        } else 
          if (type == 'Сортировка по цене (по возрастанию)') {
            filterItems.sort((prev, next) => prev.price - next.price);
          }
  
        return filterItems;
    }
  }
}
