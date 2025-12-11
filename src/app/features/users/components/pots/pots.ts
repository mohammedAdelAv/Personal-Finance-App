
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DataService, Balance } from "../../../../services/data.service";
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: "app-pots",
  templateUrl: "pots.html",
  styleUrl: "pots.css",
  imports: [CommonModule, FormsModule],
  standalone: true,
})

export class pots implements OnInit {

  // add money var

  isAddMoneyOpen: boolean = false;
  selectedPotToAddMoney: any = null;
  addMoneyAmount: number | null = null;



  // is modal open?
  isAddPotOpen: boolean = false;

  // is delete msg open?
  isDeleteMsgOpen: boolean = false;

  // is dropdown open?
  isThemeOpen: boolean = false;

  // is Withdraw Open ?
  isWithdrawOpen: boolean = false;

  // pot to delete
  potToDelete: any = null;

  // pot to delete
  potToEdit: any = null;

  // for add new pot
  colors = [
    { name: 'Beige', color: '#F2CDAC' },
    { name: 'Green', color: '#277C78' },
    { name: 'Pink', color: '#af81ba' },
    { name: 'Teal', color: '#597c7c' },
    { name: 'Brown', color: '#93674f' },
    { name: 'Cyan', color: '#82C9D7' },
    { name: 'Magenta', color: '#934f6f' },
    { name: 'Sea', color: '#3f8282' },
    { name: 'Purple', color: '#826CB0' },
    { name: 'Olive', color: '#7f9161' },
    { name: 'Dark Grey', color: '#626070' },
    { name: 'Gold', color: '#cab361' },
    { name: 'Orange', color: '#be6c49' }
  ];

  // New Pot Data
  newPot = {
    id: uuidv4(),
    name: "",
    target: null,
    total: 0,
    theme: ""
  }

  // 1 object heys names of pots & the value of object is totalsaved
  dataPots: Record<string, { totalSaved: number }> = {};

  // blance data
  balance: Balance | null = null;
  currentBalance: number = 0; // اختياري لمزيد من السهولة


  // get pots data
  potsData!: any[];
  constructor(private serv: DataService) { }

  usedColors = new Set<string>();

  ngOnInit(): void {

    this.serv.getAll().subscribe({

      next: (data) => {
        // get current data from db
        // *جلب balance و currentBalance* من الـ response
        this.balance = data?.balance ?? null;
        this.currentBalance = Number(this.balance?.current ?? 0);
        console.log('Loaded balance/currentBalance:', this.balance, this.currentBalance);

        // take pots data from DB and load it
        this.potsData = data?.pots ?? [];
        console.log("Loaded pots:", data);

        // 1
        this.dataPots = {};
        this.potsData.forEach(p => {
          const total = Number(p.total ?? 0);
          const target = Number(p.target ?? 0);
          const precent = target === 0 ? 0 : (total / target) * 100;
          this.dataPots[p.name] = { totalSaved: Math.round(precent * 100) / 100 };
        });

        // add usedcolor
        this.usedColors = new Set(this.potsData.map(p => p.theme));

      },
      error: (err) => {
        console.error("Failed to load data.json", err);
      },

    });

  }

  // check is color used
  isColorUsed(color: string): boolean {
    return this.usedColors.has(color);
  }

  // Dropdown
  // Show Name for Color
  get selectedColorName(): string {
    const found = this.colors.find(c => c.color === this.newPot.theme);
    return found ? found.name : 'Select theme';
  }

  // Open/Close Dropdown
  toggleThemeDropdown() {
    this.isThemeOpen = !this.isThemeOpen;
  }

  // Select Theme from list
  selectTheme(c: { name: string; color: string }) {

    // منع اختيار لون مستخدم
    if (this.isColorUsed && this.isColorUsed(c.color)) {
      console.warn('Color already used:', c.color);
      return;
    }
    this.newPot.theme = c.color;
    // close dropdown
    this.isThemeOpen = false;
  }

  // Close Dropdown
  closeDropdown() {
    this.isThemeOpen = false;
  }

  // End Dropdown

  // Open Modal
  openAddPot() {
    this.isAddPotOpen = true;
  }

  // Close Modal & reset & close dropdown
  closeAddPot() {
    this.isAddPotOpen = false;
    this.resetNewPot();
    this.closeDropdown();
  }

  // Reset New Pot
  private resetNewPot() {
    this.newPot = {
      id: uuidv4(),
      name: "",
      target: null,
      total: 0,
      theme: ""
    };
  }

  // Add Pot to DB
  addPot() {
    if (!this.newPot.name || !this.newPot.target) {
      console.warn("Pot name and target are required");
      return;
    }

    // get all pots from DB (arr or object)
    this.serv.getPots().subscribe({
      next: (res: any) => {
        // check allPots is array
        const allPots = Array.isArray(res) ? res : (res && res.pots ? res.pots : []);

        // check the name is exist in DB
        const existsByName = allPots.some(
          (p: any) => (p.name ?? '').toString().trim().toLowerCase() === this.newPot.name.trim().toLowerCase()
        );
        if (existsByName) {
          console.warn("A pot with this name already exists");
          return;
        }

        // generate new id
        const newId = uuidv4();

        // new pot
        const newItem = {
          id: newId,
          name: this.newPot.name,
          target: Number(this.newPot.target),
          total: Number(this.newPot.total ?? 0),
          theme: this.newPot.theme
        };

        // order post to add new pot in json DB
        // send new pot to API to add in DB
        this.serv.addPot(newItem).subscribe({
          // next : receives the created element in DB
          next: (created: any) => {
            console.log("Pot added successfully!", created);

            // if the server restores the item created else use newItem & update interface immediately
            const itemToPush = created ?? newItem;
            // add new pot to arr with old pots : update the potsData arr
            this.potsData = Array.isArray(allPots) ? [...allPots, itemToPush] : [...allPots, itemToPush];

            // when a color is selected from dropdown list, it instant update to indicate that it is used color
            this.usedColors.add(itemToPush.theme);

            this.dataPots[itemToPush.name] = {
              totalSaved: itemToPush.target ? Math.round(((itemToPush.total ?? 0) / itemToPush.target) * 10000) / 100 : 0
            };

            // colse and reset the modal
            this.closeAddPot();
            this.resetNewPot();
          },
          error: (err) => {
            console.error("Error adding pot:", err);
          }
        });
      },
      error: (err) => {
        console.error("Failed to fetch pots before adding:", err);
      }
    });
  }


  // -------------------------------------------------------------------------------------------------------------


  // open menu ellipsis
  openMenuId: string | null = null;
  toggleMenu(p: any) {
    this.openMenuId = this.openMenuId === p.id ? null : p.id;
  }

  // close Delete Pot
  closeDeletePot() {
    this.isDeleteMsgOpen = false;
    this.potToDelete = null;
  }

  // open Delete msg
  openDeleteMsg(pot: any) {
    this.isDeleteMsgOpen = true;
    this.openMenuId = null;
    this.potToDelete = pot;
  }

  // delet pot
  deletePot() {
    if (!this.potToDelete) return;

    this.serv.deletePot(this.potToDelete.id).subscribe({
      next: () => {
        console.log("Pot deleted");

        // امسحه من الواجهة بدون ريفريش
        this.potsData = this.potsData.filter(p => p.id !== this.potToDelete.id);

        // اقفل المينيو لو مفتوحة
        this.openMenuId = null;
        this.potToDelete = null;
      },
      error: err => console.error("Delete error:", err)
    });
  }


  // Withdraw -------------------------------------------------------------------------------------------------------------


  selectedPot: any = null;
  withdrawAmount: number | null = null;

  // open Withdraw
  openWithdraw(pot: any) {
    this.isWithdrawOpen = true;
    this.selectedPot = { ...pot };
    this.withdrawAmount = null;
  }

  // close Withdraw
  closeWithdraw() {
    this.isWithdrawOpen = false;
    this.selectedPot = null;
    this.withdrawAmount = 0;
  }

  // القيمة الجديدة بعد السحب (Live)
  get newAmount() {
    if (!this.selectedPot) return 0;
    const amount = Number(this.withdrawAmount) || 0;
    return this.selectedPot.total - amount < 0 ? 0 : this.selectedPot.total - amount;
  }

  // النسبة الجديدة
  get newPercent() {
    if (!this.selectedPot) return 0;
    const target = Number(this.selectedPot.target) || 0;
    if (target === 0) return 0;
    return Math.round((this.newAmount / target) * 10000) / 100;
  }

  // عرض قيمة progress bar live
  get progressWidth() {
    return this.newPercent + '%';
  }

  // confirm Withdraw
  confirmWithdraw() {
    const amount = Number(this.withdrawAmount);
    if (!amount || amount <= 0) return alert('Enter valid amount');

    if (this.selectedPot.total < amount) {
      alert('Not enough balance!');
      return;
    }
    // update new total
    const updatedTotal = this.selectedPot.total - amount;
    const updatedPot = { ...this.selectedPot, total: updatedTotal };

    // send updates to server
    this.serv.updatePot(this.selectedPot.id, updatedPot).subscribe({
      next: () => {
        console.log('Withdraw successful');

        // نحدث البيانات في الواجهة مباشرة
        const potIndex = this.potsData.findIndex(p => p.id === this.selectedPot.id);
        if (potIndex !== -1) this.potsData[potIndex] = updatedPot;

        // إغلاق البوب أب
        this.closeWithdraw();
      },
      error: err => console.error('Error updating pot:', err)
    });

  }

  // add money -------------------------------------------------------------------------------------------------------------

  // open AddMoney
  openAddMoney(pot: any) {
    this.isAddMoneyOpen = true;
    this.selectedPotToAddMoney = { ...pot };
    this.addMoneyAmount = null;
  }

  // close AddMoney
  closeAddMoney() {
    this.isAddMoneyOpen = false;
    this.selectedPotToAddMoney = null;
    this.addMoneyAmount = 0;
  }

  // القيمة الجديدة بعد السحب (Live)
  get newAmountAddMoney() {
    if (!this.selectedPotToAddMoney) return 0;
    const amount = Number(this.addMoneyAmount) || 0;
    return this.selectedPotToAddMoney.total + amount < 0 ? 0 : this.selectedPotToAddMoney.total + amount;
  }

  // النسبة الجديدة
  get newPercentAddMoney() {
    if (!this.selectedPotToAddMoney) return 0;
    const target = Number(this.selectedPotToAddMoney.target) || 0;
    if (target === 0) return 0;
    return Math.round((this.newAmountAddMoney / target) * 10000) / 100;
  }

  // عرض قيمة progress bar live
  get progressWidthAddMoney() {
    return this.newPercent + '%';
  }

  // confirm add money
  confirmAddMoney() {

    const amount = Number(this.addMoneyAmount ?? 0);
    if (!amount || amount <= 0) {
      alert('Enter valid amount');
      return;
    }

    // تأكد أن لدينا رصيد (استعمل this.currentBalance أو this.balance)
    const current = Number(this.balance?.current ?? this.currentBalance ?? 0);

    // *تصحيح المقارنة*: يجب أن يكون amount <= current للسماح بالعملية
    if (amount > current) {
      alert('Not enough current balance!');
      return;
    }

    if (!this.selectedPotToAddMoney || !this.selectedPotToAddMoney.id) {
      console.warn('No pot selected to add money');
      return;
    }

    // حفظ نسخ قديمة لعمل rollback لو حصل خطأ
    const potIndex = this.potsData.findIndex(p => p.id === this.selectedPotToAddMoney.id);
    const oldPot = potIndex !== -1 ? { ...this.potsData[potIndex] } : null;
    const oldBalance = current;

    // جهّز التحديثات
    const updatedTotal = Number(this.selectedPotToAddMoney.total ?? 0) + amount;
    const updatedPot = { ...this.selectedPotToAddMoney, total: updatedTotal };


    const updatedBalancePayload: Partial<Balance> = {
      current: Number((current - amount).toFixed(2))
    };
    // 1) حدّث الـ pot أولاً
    this.serv.updatePot(this.selectedPotToAddMoney.id, updatedPot).subscribe({
      next: () => {
        // حدّث الواجهة محلياً
        if (potIndex !== -1) this.potsData[potIndex] = updatedPot;
        // 2) ثم حدّث الـ balance على السيرفر
        this.serv.updateBalance(updatedBalancePayload).subscribe({
          next: () => {
            this.currentBalance = updatedBalancePayload.current ?? this.currentBalance;
            if (this.balance) this.balance.current = updatedBalancePayload.current ?? this.balance.current;
            // أغلق المودال وننظف الحقول
            this.closeAddMoney();
            this.addMoneyAmount = null;
          },
          error: (err) => {
            console.error('Error updating balance:', err);
            alert('Failed to update balance. Please try again.');

            // تراجع: ارجع الـ pot للحالة القديمة محلياً
            if (potIndex !== -1 && oldPot) this.potsData[potIndex] = oldPot;
            // ارجع الرصيد المحلي
            this.currentBalance = oldBalance;
            if (this.balance) this.balance.current = oldBalance;
          }
        });
      },
      error: (err) => {
        console.error('Error updating pot:', err);
        alert('Failed to update pot. Please try again.');
      }
    });
  }

}
