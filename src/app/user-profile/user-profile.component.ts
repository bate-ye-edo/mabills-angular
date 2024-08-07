import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../shared/user-profile/user-profile.service";
import {UserFormControls} from "../shared/user-form.controls";
import {ShowModalService} from "../shared/show-modal.service";
import {CreditCardModalComponent} from "./credit-card-modal/credit-card-modal.component";
import {NO_BACK_DROP_MODAL_LARGE_SIZE, NO_BACK_DROP_MODAL_MEDIUM_SIZE} from "../shared/modal-options";
import {UserProfile} from "../shared/user-profile/user-profile.model";
import {BankAccountModalComponent} from "./bank-account-modal/bank-account-modal.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private originalUserProfile: UserProfile;
  userProfile: UserProfile = <UserProfile>{};
  title: string = 'Profile';
  userFormControls: UserFormControls;
  canUpdate: boolean = false;
  constructor(private userProfileService: UserProfileService, private showModalService: ShowModalService) { }

  ngOnInit(): void {
    this.userFormControls = new UserFormControls()
      .passwordNotRequired()
      .usernameNotRequired()
      .build();
    this.getUserProfile();
  }

  private getUserProfile(): void {
    this.userProfileService.getUserProfile()
      .subscribe({
        next: (user: UserProfile) => this.initializeComponent(user)
      });
  }

  private initializeComponent(user: UserProfile): void {
    this.userProfile = {...user};
    this.originalUserProfile = user;
    this.setFormControlsValues();
    this.subscribeFormControlsValueChanges();
    this.canUpdate = false;
    this.title = this.userProfile.username+'\'s profile';
  }

  reset(): void {
    this.userProfile = {...this.originalUserProfile};
    this.setFormControlsValues();
    this.canUpdate = false;
  }

  updateProfile(): void {
    this.userProfileService.updateUserProfile(this.buildNewUserProfileFromFormControls())
      .subscribe({
        next: (updatedUserProfile: UserProfile) => this.initializeComponent(updatedUserProfile)
      });
  }

  private buildNewUserProfileFromFormControls(): UserProfile {
    return <UserProfile>{
      username: this.userProfile.username,
      email: this.userFormControls.getEmailFormControlValue(),
      mobile: this.userFormControls.getMobileFormControlValue(),
      password: this.userFormControls.getPasswordFormControlValue(),

    };
  }

  disableUpdateButton(): boolean {
    return !this.canUpdate || this.userFormControls.inputsHaveErrors();
  }

  private setFormControlsValues(): void{
    this.userFormControls
      .setEmailFormControlValue(this.userProfile.email)
      .setMobileFormControlValue(this.userProfile.mobile)
      .setPasswordFormControlValue('');
  }

  private subscribeFormControlsValueChanges(): void {
    this.subscribeEmailValueChanges();
    this.subscribeMobileValueChanges();
    this.subscribePasswordValueChanges();
  }

  private subscribeEmailValueChanges(): void {
    this.userFormControls.getEmailFormControlValueObservable()
      .subscribe({
        next: (value: string) => {
          this.canUpdate = this.originalUserProfile.email !== value;
        }
      });
  }

  private subscribeMobileValueChanges(): void {
    this.userFormControls.getMobileFormControlValueObservable()
      .subscribe({
        next: (value: string) => {
          this.canUpdate = this.originalUserProfile.mobile !== value;
        }
      });
  }

  private subscribePasswordValueChanges(): void {
    this.userFormControls.getPasswordFormControlValueObservable()
      .subscribe({
        next: (value: string) => {
          this.canUpdate = value !== '';
        }
      });
  }

  showBankAccountModal(): void {
    this.showModalService.showModal(BankAccountModalComponent, NO_BACK_DROP_MODAL_MEDIUM_SIZE);
  }

  showCreditCardsModal(): void {
    this.showModalService.showModal(CreditCardModalComponent, NO_BACK_DROP_MODAL_LARGE_SIZE);
  }
}
