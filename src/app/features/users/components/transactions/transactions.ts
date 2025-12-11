import { routes } from './../../../../app.routes';
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";

// to can read query params
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transactions",
  templateUrl: "transactions.html",
  styleUrl: "transactions.css",
  imports: [CommonModule, NgxPaginationModule],
  standalone: true,
})



export class transactions implements OnInit {

  transactions: { avatar?: string; name?: string; category?: string; date?: Date; amount?: number; recurring?: boolean }[] = [];
  filtered: any[] = [];

  selectedSort: string = 'Latest';
  selectedCategroy: string = 'All Transactions';



  page = 1;
  itemsPerPage = 10;

  //add ActivatedRoute to constructor to can read query params
  constructor(private dataService: DataService, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.dataService.getAll().subscribe({
      next: (data) => {
        this.transactions = data?.transactions ?? [];
        this.page = 1;
        console.log("Loaded transactions:", this.transactions);
        this.filtered = [...this.transactions];

        // ---- listen for query params
        // if in link category, add to selectedCategroy and do filtere
        this.route.queryParams.subscribe(params => {
          const cat = params['category'];
          if (cat && typeof cat === 'string' && cat.trim() !== '') {
            // نستخدم القيمة كما أتت (لكن الفلترة نفسها ستكون case-insensitive)
            this.selectedCategroy = cat;
          } else {
            this.selectedCategroy = 'All Transactions';
          }
          // نطبّق الفلاتر بعد قراءة القيمة
          this.updateFilters();
        });
        // ---- انتهى الاستماع للـ queryParams
      },

      error: (err) => {
        console.error("Failed to load data.json", err);
      },
    });
  }

  totalPages(): number {
    return Math.ceil(this.filtered.length / this.itemsPerPage);
  }

  // يولّد مصفوفة أرقام الصفحات [1,2,3,...]
  get pages(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // تصفية البيانات حسب الصفحة الحالية
  get paginatedtransactions() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    return this.filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(newPage: number) {
    if (newPage < 1) newPage = 1;
    const max = this.totalPages() || 1;
    if (newPage > max) newPage = max;
    this.page = newPage;
  }

  setSort(option: string) {
    this.selectedSort = option;
    this.updateFilters(); // ← دا اللي يخلي الفلترة تتطبق فورًا
  }

  setCategroy(option: string) {
    this.selectedCategroy = option;
    this.updateFilters(); // ← دا اللي يخلي الفلترة تتطبق فورًا
  }

  updateFilters() {
    let arr = [...this.transactions];

    if (this.selectedCategroy !== 'All Transactions') {
      arr = arr.filter(t => t.category === this.selectedCategroy);
    }

    if (this.selectedSort === 'Latest') arr.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    if (this.selectedSort === 'Oldest') arr.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    if (this.selectedSort === 'Highest') arr.sort((a, b) => b.amount! - a.amount!);
    if (this.selectedSort === 'Lowest') arr.sort((a, b) => a.amount! - b.amount!);
    if (this.selectedSort === 'A to Z') arr.sort((a, b) => a.name!.localeCompare(b.name!));
    if (this.selectedSort === 'Z to A') arr.sort((a, b) => b.name!.localeCompare(a.name!));

    this.filtered = arr;
  }


}
