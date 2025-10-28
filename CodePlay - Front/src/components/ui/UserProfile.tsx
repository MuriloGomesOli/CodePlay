// src/components/UserProfile.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

interface UserProfileProps {
  userName: string;
  userTitle: string;
  avatarSrc?: string;
  skills?: string[];      // Ex: ['CSS', 'JavaScript']
  module?: number;
  level?: number;
  extraInfo?: Record<string, string | number>; // Para quaisquer informações extras
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  onLogoutClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  userTitle,
  avatarSrc = '/path/to/user-avatar.png',
  skills = [],
  module = 1,
  level = 1,
  extraInfo = {},
  onProfileClick,
  onMenuClick,
  onLogoutClick,
}) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>Perfil de Usuário</div>
      <div className={styles.profileContent}>
        <img src={avatarSrc} alt="Avatar do Usuário" className={styles.avatar} />
        <h2 className={styles.userName}>{userName}</h2>
        <p className={styles.userTitle}>{userTitle}</p>

        <div className={styles.statusBadges}>
          {skills.map((skill) => (
            <span key={skill} className={styles.badgePython}>{skill}</span>
          ))}

          <span className={styles.badgeModule}>Módulo: {module}</span>
          <span className={styles.badgeLevel}>Nível: {level}</span>

          {/* Renderizar informações extras dinamicamente */}
          {Object.entries(extraInfo).map(([key, value]) => (
            <span key={key} className={styles.badgeExtra}>
              {key}: {value}
            </span>
          ))}
        </div>

        <div className={styles.navButtons}>
          <button className={styles.navButton} onClick={onProfileClick}>Perfil</button>
          <button className={styles.navButton} onClick={onMenuClick}>Menu</button>
          <button className={`${styles.navButton} ${styles.logoutButton}`} onClick={onLogoutClick}>Sair</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
