import { CommonModule } from "@angular/common";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../../../../services/data.service";


@Component({
  selector: "app-recurringBills",
  templateUrl: "recurringBills.html",
  styleUrl: "recurringBills.css",
  imports: [CommonModule],
  standalone: true,
})

export class recurringBills implements OnInit {

  selectedSort: string = 'Latest';


  totalAll: number = 0;

  paidbills: number = 0;
  totalPaidbills: number = 0;

  upcoming: number = 0;
  totalUpcoming: number = 0;

  dueSoon: number = 0;
  totalDueSoon: number = 0;

  overdue: number = 0;
  totalOverdue: number = 0;

  @Input() hideView: boolean = false;
  @Output() changed = new EventEmitter<{
    paid: number;
    upcoming: number;
    duesoon: number;
    overdue: number;
  }>();

  traData!: any[];
  constructor(private serv: DataService) { this.serv.authDataUser();}

  ngOnInit(): void {
    this.serv.getAll().subscribe({
      next: (data) => {
        const allTransaction = data?.transactions ?? [];
        this.traData = allTransaction.filter((t: any) => t.recurring === true);
        this.getBillStatus();
        console.log("Loaded transactions:", this.traData);
      },

      error: (err) => {
        console.error("Failed to load data.json", err);
      },
    });
  }


  getBillStatus() {
    const today = new Date();
    for (const A of this.traData) {
      const billDate = new Date(A.date);
      const diffDate = (billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (A.status === "paid") {
        this.paidbills++;
        this.totalPaidbills += Math.abs(A.amount);
        A.image = "./assets/images/icon-bill-paid.svg";
      }
      if (A.status === "unpaid") {
        if (diffDate < 0) {
          this.overdue++;
          this.totalOverdue += Math.abs(A.amount);
          A.image = "./assets/images/icon-bill-due.svg";
        }
        else if (diffDate <= 3) {
          this.dueSoon++;
          this.totalDueSoon += Math.abs(A.amount);
        }
        else {
          this.upcoming++;
          this.totalUpcoming += Math.abs(A.amount);
        }
      }
      this.changed.emit({
        paid: this.totalPaidbills,
        upcoming: this.totalUpcoming,
        duesoon: this.totalDueSoon,
        overdue: this.totalOverdue
      });
    }
    this.updateTotalAll();
  }


  updateTotalAll() {
    this.totalAll =
      this.totalPaidbills +
      this.totalUpcoming +
      this.totalDueSoon +
      this.totalOverdue;
  }



  markAsPaid(bill: any) {
    bill.status = "paid"; // update in UI immediately
    this.serv.updateTransaction(bill.id, { status: "paid" }).subscribe({
      next: () => console.log("Bill updated successfully"),
      error: (err) => console.error("Error updating bill:", err)
    });
  }






  setSort(option: string) {
    this.selectedSort = option;
    this.updateFilters();
  }

  updateFilters() {
    let arr = [...this.traData];

    if (this.selectedSort === 'Latest') arr.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    if (this.selectedSort === 'Oldest') arr.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    if (this.selectedSort === 'Highest') arr.sort((a, b) => a.amount! - b.amount!);
    if (this.selectedSort === 'Lowest') arr.sort((a, b) => b.amount! - a.amount!);
    if (this.selectedSort === 'A to Z') arr.sort((a, b) => a.name!.localeCompare(b.name!));
    if (this.selectedSort === 'Z to A') arr.sort((a, b) => b.name!.localeCompare(a.name!));

    this.traData = arr;
  }

}
