import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { Chart, registerables } from "chart.js";
import { AdminModule } from "../../../admins/admin.modules";



Chart.register(...registerables);

@Component({
  selector: "app-budgets",
  templateUrl: "budgets.html",
  styleUrl: "budgets.css",
  imports: [CommonModule, AdminModule],
  standalone: true,
})


export class budgets implements OnInit {

  totalSpent: number = 0;
  totalBudget: number = 0;

  @Input() hideView: boolean = false;
  @Output() changed = new EventEmitter<{
    totalSpent: number;
  }>();


  // arr for budgets categories in DB 1
  categories = ["General", "Entertainment", "Bills", "Dining Out",
    "Personal Care", "Shopping", "Education", "Lifestyle",
    "Transportation", "Groceries"
  ];
  // 1
  totals: Record<string, { spent: number, remaining: number, theme: string }> = {};

  // cal data inside doughnut chart 3
  calculateTotals(): void {
    this.totalBudget = this.budgetData.reduce((sum, b) => sum + (b.maximum ?? 0), 0);
    this.totalSpent = Object.values(this.totals).reduce((sum, val) => sum + val.spent, 0)
    this.changed.emit({
      totalSpent: this.totalSpent,
    });
  }

  // 2
  transactionsCategory: Record<string, any[]> = {};

  // 4
  objectKeys = Object.keys;
  categoryTotals: Record<string, number> = {};

  // get budget & transactions data
  budgetData!: any[];
  transactionsData!: any[];
  constructor(private serv: DataService) { }
  ngOnInit(): void {
    this.serv.getAll().subscribe({
      next: (data) => {
        const allBudget = data?.budgets ?? [];
        this.budgetData = allBudget;
        this.transactionsData = data?.transactions ?? [];
        console.log("Loaded transactions:", data);

        // 2
        this.transactionsCategory = {};
        this.transactionsData.forEach(tx => {
          const category = tx.category || 'Uncategorized';
          if (!this.transactionsCategory[category]) {
            this.transactionsCategory[category] = [];
          };
          this.transactionsCategory[category].push(tx);
        });
        console.log("Grouped Data: ", this.transactionsCategory);

        // 4
        this.categoryTotals = {};
        Object.keys(this.transactionsCategory).forEach(category => {
          const total = this.transactionsCategory[category].reduce((sum, ax) => {
            return sum + Math.abs(ax.amount || 0);
          }, 0);
          this.categoryTotals[category] = total;
        });

        // 1
        this.totals = {};
        this.budgetData.forEach(b => {
          const spent = this.categoryTotals[b.category] || 0;
          const remaining = (b.maximum ?? 0) - spent;
          const theme = b.theme;
          this.totals[b.category] = { spent, remaining, theme };
        });

        // 3
        this.calculateTotals();

      },
      error: (err) => {
        console.error("Failed to load data.json", err);
      },
    });
  }


  // doughnut chart by chart.js
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.budgetData.length > 0) {
        const ctx = document.getElementById("budgetChart") as HTMLCanvasElement;

        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: this.budgetData.map((b) => b.category),
            datasets: [
              {
                data: this.budgetData.map((b) => b.maximum),
                backgroundColor: this.budgetData.map((b) => b.theme ?? "#ccc"),
                borderWidth: 1,
              },
            ],
          },
          options: {
            cutout: "62%",
            plugins: {
              legend: {
                display: false
              },
            },
          },
        });
      }
    }, 500);
  }

}
