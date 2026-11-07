import type { OwnerProfile } from '../types/profile';

export interface ProfileSaveResponse {
  success: boolean;
  message: string;
}

export interface ProfileService {
  saveProfile(profile: OwnerProfile): Promise<ProfileSaveResponse>;
}

let simulateError = false;
const MOCK_DELAY_MS = 1200;

export function setSimulateError(enabled: boolean): void {
  simulateError = enabled;
}

export const profileService: ProfileService = {
  async saveProfile(): Promise<ProfileSaveResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateError) {
          reject(new Error('Mock error: unable to save profile. Please try again.'));
          return;
        }
        resolve({
          success: true,
          message: 'Profile saved successfully.',
        });
      }, MOCK_DELAY_MS);
    });
  },
};
