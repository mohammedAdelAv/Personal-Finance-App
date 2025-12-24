import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../../../services/data.service";
import { Chart, registerables } from "chart.js";
import { recurringBills } from "../recurringBills/recurringBills";
import { RouterLink } from "@angular/router";
import { budgets } from "../budgets/budgets";


Chart.register(...registerables);

@Component({
  selector: "app-overview",
  templateUrl: "overview.html",
  styleUrl: "overview.css",
  imports: [CommonModule, recurringBills, RouterLink, budgets],
  standalone: true,
})
export class overview implements OnInit, AfterViewInit {

  balance: { id?: string; current?: number; income?: number; expenses?: number } | null = null;
  pots: { name?: string; total?: number }[] = [];
  transactions: { avatar?: string; name?: string; date?: Date; amount?: number }[] = [];
  budgets: { category?: string; maximum?: number; theme?: string }[] = [];

  constructor(private dataService: DataService) { }

  // total saved pots
  totalSaved: number = 0;

  totalSpent: number = 0;
  totalBudget: number = 0;

  summary = {
    paid: 0,
    upcoming: 0,
    duesoon: 0,
    overdue: 0
  }

  onSummaryChanged(data: any) {
    this.summary = data;
  }

  summaryBu = {
    totalSpent: 0,
  }
  onSummaryBuChanged(data: any) {
    this.summaryBu = data;
  }

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
        // Call cal total saved pots
        this.calTatolSaved();
      },

      error: (err) => {
        console.error("Failed to load data.json", err);
      },
    });
  }

  // total saved pots fun
  calTatolSaved() {
    this.totalSaved = this.pots.reduce((sum, b) => sum + (b.total ?? 0), 0);
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
