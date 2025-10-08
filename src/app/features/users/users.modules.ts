import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

import { overview } from './components/overview/overview';
import { transactions } from './components/transactions/transactions';
import { budgets } from './components/budgets/budgets';
import { pots } from './components/pots/pots';
import { recurringBills } from "./components/recurringBills/recurringBills";

import { Layouts } from "./layouts/layouts";




const routes: Routes = [

  {
    path: "",
    component: Layouts,
    children: [
      { path: "overview", component: overview },
      { path: "transactions", component: transactions },
      { path: "budgets", component: budgets },
      { path: "pots", component: pots },
      {path: "recurringBills", component: recurringBills},

      { path: "", pathMatch: "full", redirectTo: "overview" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class userModules {

}
