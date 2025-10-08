import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../../../services/data.service";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: "app-overview",
  templateUrl: "overview.html",
  styleUrl: "overview.css",
  imports: [CommonModule],
  standalone: true,
})
export class overview implements OnInit, AfterViewInit {

  balance: { current?: number; income?: number; expenses?: number } | null = null;
  pots: { name?: string; total?: number }[] = [];
  transactions: { avatar?: string; name?: string; date?: Date; amount?: number }[] = [];
  budgets: { category?: string; maximum?: number; theme?: string }[] = [];

  constructor(private dataService: DataService) { }

  totalSpent: number = 0;
  totalBudget: number = 0;

  ngOnInit(): void {
    this.dataService.getAll().subscribe({
      next: (data) => {
        this.balance = data?.balance ?? null;
        this.pots = data?.pots ?? [];
        this.transactions = data?.transactions ?? [];
        this.budgets = data?.budgets ?? [];
        console.log("Loaded data:", data);

        this.totalBudget = this.budgets.reduce((sum, b) => sum + (b.maximum ?? 0), 0);
        this.totalSpent = 338;

      },

      error: (err) => {
        console.error("Failed to load data.json", err);
      },
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.budgets.length > 0) {
        const ctx = document.getElementById("budgetChart") as HTMLCanvasElement;

        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: this.budgets.map((b) => b.category),
            datasets: [
              {
                data: this.budgets.map((b) => b.maximum),
                backgroundColor: this.budgets.map((b) => b.theme ?? "#ccc"),
                borderWidth: 1,
              },
            ],
          },
          options: {
            cutout: "65%",
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
