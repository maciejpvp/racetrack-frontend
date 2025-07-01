const soundFiles = {
  move: "/sounds/move.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
} as const;

type SoundKey = keyof typeof soundFiles;

class AudioManager {
  private static instance: AudioManager;
  private sounds: Record<SoundKey, HTMLAudioElement>;

  private constructor() {
    this.sounds = {} as Record<SoundKey, HTMLAudioElement>;

    for (const [key, path] of Object.entries(soundFiles) as [
      SoundKey,
      string,
    ][]) {
      this.sounds[key] = new Audio(path);
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public play(key: SoundKey): void {
    const sound = this.sounds[key];
    sound.currentTime = 0;
    sound.play();
  }

  public pause(key: SoundKey): void {
    this.sounds[key].pause();
  }

  public get(key: SoundKey): HTMLAudioElement {
    return this.sounds[key];
  }
}

export const audioManager = AudioManager.getInstance();
export type { SoundKey };
