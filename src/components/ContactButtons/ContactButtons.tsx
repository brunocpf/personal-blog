import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';

export interface ContactButtonsProps {}

const ContactButtons: React.FC<ContactButtonsProps> = () => {
  return (
    <Box>
      <IconButton
        target="_blank"
        href="https://www.twitter.com/saintgalgo"
        title="Twitter"
      >
        <FaTwitter />
      </IconButton>
      <IconButton
        target="_blank"
        href="https://github.com/brunocpf"
        title="Github"
      >
        <FaGithub />
      </IconButton>
      <IconButton
        target="_blank"
        href="https://www.linkedin.com/in/bruno-cesar-pimenta-fernandes-72a2a6139/"
        title="LinkedIn"
      >
        <FaLinkedin />
      </IconButton>
      <IconButton
        target="_blank"
        href="https://discord.com/users/saint#2278"
        title="Discord"
      >
        <FaDiscord />
      </IconButton>
      <IconButton
        target="_blank"
        href="mailto:brunocpf@outlook.com"
        title="Email"
      >
        <GrMail />
      </IconButton>
    </Box>
  );
};

export default ContactButtons;
