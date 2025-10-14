// src/components/UserProfile.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

// Importe os ícones sociais
let instagramIcon = '';
let facebookIcon = '';
let twitterIcon = '';
try {
  instagramIcon = require('../assets/social-icons/instagram.png');
  facebookIcon = require('../assets/social-icons/facebook.png');
  twitterIcon = require('../assets/social-icons/twitter.png');
} catch (e) {
  // keep empty fallback
}

const UserProfile: React.FC = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        Perfil de Usuário
      </div>
      <div className={styles.profileContent}>
        <img src="/path/to/user-avatar.png" alt="Avatar do Usuário" className={styles.avatar} />
        <h2 className={styles.userName}>Nome do Usuário</h2>
        <p className={styles.userTitle}>Desenvolvedor iniciante</p>

        <div className={styles.statusBadges}>
          <span className={styles.badgePython}>CSS</span>
          <span className={styles.badgeModule}>Módulo: 1</span>
          <span className={styles.badgeLevel}>Nível: 1</span>
        </div>

        <div className={styles.navButtons}>
          <button className={styles.navButton}>Perfil</button>
          <button className={styles.navButton}>Menu</button>
          <button className={`${styles.navButton} ${styles.logoutButton}`}>Sair</button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;