"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { submitJoinRequest } from "./actions";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import "./join.css";

/* ── Auto-link builders ── */
const toGithubUrl    = (u: string) => u.trim() ? `https://github.com/${u.trim()}` : "";
const toCfUrl        = (u: string) => u.trim() ? `https://codeforces.com/profile/${u.trim()}` : "";
const toCodechefUrl  = (u: string) => u.trim() ? `https://codechef.com/users/${u.trim()}` : "";

const initialForm = {
  fullName: "",
  batch: "",
  studentId: "",
  registrationNumber: "",
  email: "",
  linkedin: "",     // full URL (required)
  github: "",       // username → auto link (required)
  facebook: "",     // full URL (optional)
  discord: "",      // username (optional/required)
  codeforces: "",   // handle → auto link (required)
  codechef: "",     // username → auto link (required)
};

/* ── Social icon SVGs ── */
const IconGH = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
);
const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const IconLI = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const IconFB = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const IconDiscord = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);
const IconCF = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="10" width="4" height="12" rx="1"/><rect x="10" y="4" width="4" height="18" rx="1"/><rect x="18" y="7" width="4" height="15" rx="1"/></svg>
);
const IconCC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648zm5.0428 14.3788a9.8602 9.8602 0 0 0-.0326-.9824c-.0541-.703-1.1892-1.46-2.7032-1.8386-.588-.1336-1.1764-.2142-1.7448-.2356-.539-.0137-1.0657.0248-1.5546.1277-1.2436.2704-2.2162.9193-2.811 1.8925l.0511 1.431c.6672-.3558 1.7326-.8747 3.139-.9994.0662-.0059.1368-.0059.2044-.0099.1177-.013.2667-.044.4444-.044 1.6075 0 3.2682.5336 4.8767 1.6483.039-.2744.0611-.549.071-.8234l.044.0227c.0028-.0622.0143-.1268.0156-.1888zM11.256.0578c.1239-.0034.2538.01.379.0114-.23-.0022-.4588.0026-.6871.0156.103-.0061.2046-.0242.308-.027zm.4983.0156c.6552.014 1.3255.0711 2.0387.1803-.6834-.0987-1.3646-.1671-2.0387-.1803zm-1.3147.0554c-.076.0087-.1527.0133-.2285.0241-.8168.1167-1.7742.7015-2.75 1.045.3545-.1323.7143-.2957 1.0747-.4501C9.0765.4774 9.6705.207 10.1571.1529c.0939-.0139.1886-.0133.2825-.0241zm-.2285.24c.1622 0 .3787-.0002.5409.0539-.1425-.0357-.2595-.026-.3706-.0142a1.174 1.174 0 0 1 .3166.0681c.5796 1.0012-.4264 5.2791-.6786 8.1492.1559 1.0276.3138 1.9963.4628 2.7201-.7029-1.7843-1.4067-4.921-1.5148-7.354-.054-.9733.001-1.8386.2172-2.4874C9.401.8557 9.7244.4228 10.2111.3687zm3.1361.271c-.811 2.1088-.9184 6.1092-.9725 7.3528-.054.5407-.0001 1.73.054 2.5952 0 .2163.054.4325.054.6488 0-.2163-.054-.3786-.054-.5948-.4326-3.2442-.974-7.1362.9185-10.002zm3.352.3777c-.2704 2.1628-1.4047 3.191-1.7832 5.2998-.1081 1.6762-.325 3.6222-.379 5.2984-.0541-1.6762-.0007-3.4601.2697-5.2444.2703-1.8384.8651-3.6776 1.8925-5.3538zm-10.381.433c-.3581.1194-.632.248-.8575.3805.2317-.1358.4996-.2666.8575-.3805zm.2101.1974c.2155.0025.4384.0734.6006.2357-.0067-.004-.0078-.0033-.0142-.0071.1331.0929.2666.2093.3932.3847-.2036.9673.2553 3.0317.0398 4.6694.0763 1.5485.0717 3.1804.849 4.4594-.9796-1.5107-1.176-3.4375-1.3218-5.236-.1128-1.0907-.2035-2.0969-.4642-2.9033-.144-.3047-.2684-.5745-.3833-.822-.0247-.0369-.0447-.0784-.071-.1135-.1082-.1082-.1619-.2696-.1619-.3777 0-.054.0539-.1618.108-.1618.054-.0541.1616-.0553.2157-.1094a1.013 1.013 0 0 1 .2101-.0184zm-1.3459.6133c-.0604.0201-.0923.041-.1405.061.1768-.034.3617.0339.5196.318-.1877.8916.4364 3.3685.4288 5.104.3124 1.8478.5496 3.8498 1.5716 5.1152C6.3723 11.5076 5.886 9.1286 5.5076 7.128 5.183 5.56 4.9125 4.2086 4.3718 3.776c-.054-.1081-.1079-.163-.1079-.2711 0-.1622-.0002-.3786.1079-.5949-.2772.6337-.4047 1.2673-.3706 1.901-.0445-.6487.0857-1.2905.3706-1.901 0-.054.054-.0538.054-.1079.012-.016.0314-.0349.044-.0511.0618-.0983.1308-.189.2257-.257.0557-.0615.0965-.1191.159-.1817-.0526.0555-.0872.1092-.1335.1647.0273-.018.0523-.0368.0838-.0525.1081-.1082.2154-.1633.3776-.1633zm-.3776.1633c-.0038.0075-.0076.0111-.0114.0184.0125-.0099.0242-.0208.037-.0298-.0074.0037-.0182.0077-.0256.0114zm14.7608 1.1343c-.0017.0052-.004.0104-.0057.0156.0378-.005.0751-.0173.1135-.0156-.0378-.0022-.0763.0103-.115.0199-.8634 2.6418-1.8874 5.2844-2.9118 7.9262a.0184.0184 0 0 1-.0015.0028c-.0874.4652-.234.8842-.5395 1.1898.4326-.4867.4854-1.1907.5395-2.0558.054-.811.0544-1.6761.487-2.5413 0-.0531.0012-.1058.0525-.159.0003-.0009.0012-.0019.0015-.0028.0973-.3524.202-.6885.3166-1.018.4183-1.2896 1.1396-3.1653 2.0131-3.3405.0163-.0052.034-.018.0497-.0213zM8.3726 16.2113l-.3238.1079c.1623.2163.2696.379.3777.433.1081.054.2168.108.379.108.0541 0 .1618 0 .2159-.054l.812-.2698c.0541 0 .1078-.054.1619-.054.1081 0 .1616 0 .2697.054l.2712.2698.2697-.054c-.1081-.1622-.2695-.3236-.3776-.3776-.1082-.0541-.2169-.1094-.379-.1094h-.108l-.866.3252h-.1618c-.1082 0-.2157 0-.2698-.054-.054-.054-.163-.1629-.2712-.3251zm-2.5953.541c-.2703.1621-.649.4324-1.1897.6487-.5407.2163-.9734.4325-1.1897.6488-.2163.2163-.3237.4326-.3237.6488 0 .1082.0537.1632.1618.2172.054.0541.1632.0539.2172.108.757.3244 1.5133.7019 2.2162 1.0803.1082.0541.2171.1632.2712.2173.054.054.1078.054.1618.054.1082 0 .2695-.0538.3777-.162.1081-.108.1632-.217.1632-.325 0-.1082-.055-.1618-.1632-.2158 0 0-.4328-.2165-1.1898-.541-.4866-.2162-.9179-.4326-1.1883-.5948.1623-.2704.486-.4865.9726-.7028.5407-.2163.9196-.4326 1.0818-.5948.054-.0541.054-.1078.054-.1619 0-.054-.0539-.1631-.108-.2172-.054-.054-.163-.1079-.2711-.1079zm11.247 0c-.054 0-.1618.0537-.2158.1078-.0541.1081-.1093.1632-.1093.2172v.054c.1622.1622.3797.2695.7041.3776.2704.054.5403.1632.8107.2172.3244.1082.5407.2693.6488.4856v.0553c0 .0541-.1088.1616-.3251.2698-.1082.054-.3245.2167-.5949.433-.2703.1622-.4326.3236-.5948.3776-.2163.1082-.3776.217-.4316.3252-.0541.054-.054.1077-.054.1618 0 .1081.0539.1077.108.2158.054.1081.1616.1093.2157.1093.054 0 .1078-.0554.1619-.0554.2703-.1622.6492-.3782 1.0818-.7567.4866-.3784.8655-.6484 1.0818-.8106.2163-.1082.3237-.2169.3237-.379 0-.0541.0002-.1618-.1079-.2159-.3785-.4325-.9185-.7022-1.5674-.9185-.1081-.0541-.2704-.1092-.5948-.1633-.1622-.054-.3249-.1079-.433-.1079zm-2.9743.8106c-.2704 0-.4866.055-.6488.2172-.2163.1622-.2699.4323-.2158.7567 0 .2703.1075.4865.2697.7027.1622.2163.3786.3252.5949.3252.1622 0 .2708-.0553.433-.1094.2703-.1622.379-.4319.379-.9185 0-.3785-.109-.6485-.2711-.8107-.1622-.1081-.3246-.1632-.541-.1632zm-4.4877.054c-.2704 0-.4866.055-.6488.2171-.2163.1622-.27.4323-.2158.7567 0 .2704.1075.4865.2697.7028s.3786.3251.5949.3251c.1622 0 .2708-.0552.433-.1093.2703-.1622.3776-.432.3776-.9186 0-.4325-.1075-.7025-.2697-.8106-.1622-.1082-.3247-.1633-.541-.1633zm0 .6501c.1622 0 .2711.1076.2711.2698 0 .1622-.163.2697-.2711.2697-.1622 0-.2698-.1075-.2698-.2697s.1076-.2698.2698-.2698zm4.3798.054c.1622 0 .2711.1075.2711.2697 0 .1082-.109.2698-.2711.2698-.1622 0-.2698-.1076-.2698-.2698 0-.1622.1076-.2697.2698-.2697zm-2.7032 2.1083l.1619.3237c.054.1081.1076.163.2158.2711.054.054.163.1619.2712.1619h.1078c.1082 0 .1618 0 .2158-.054.0541-.054.1632-.0538.2173-.1079l.1618-.1618c.054-.054.108-.1092.108-.1633.054-.054.0537-.1078.1078-.1618 0-.0541.054-.108.054-.108-.0541.1082-.1618.2156-.2158.3238-.1082.054-.1616.1632-.2698.1632-.1081.0541-.217.054-.3251.054s-.2157.0001-.2697-.054c-.1082 0-.1632-.0538-.2173-.1079l-.1618-.1632c-.054-.0541-.1078-.1618-.1619-.2158zm-.866 1.0278c-1.1355 0-1.8377 1.5136-3.4598.1619-.4326 2.6494 2.7583 2.866 4.11 1.7306.9192-.811.6475-1.9465-.6502-1.8925zm2.8664 0c-1.2977-.054-1.568 1.0815-.6488 1.8925 1.3518 1.1355 4.5412.9188 4.1087-1.7306-1.6221 1.3517-2.2703-.1619-3.4599-.1619z"/></svg>
);

/* ── PrefixInput — shows base URL, user types only handle/username ── */
interface PrefixInputProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  label: string;
  prefix: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  generatedUrl?: string;
}
function PrefixInput({ id, name, icon, label, prefix, placeholder, value, onChange, required, generatedUrl }: PrefixInputProps) {
  return (
    <div className="jc-form-group">
      <label htmlFor={id}>
        {icon} {label}
        {required && <span className="jc-required"> *</span>}
      </label>
      <div className="jc-prefix-input">
        <span className="jc-prefix-input__base" aria-hidden="true">{prefix}</span>
        <input id={id} name={name} type="text" value={value} onChange={onChange} placeholder={placeholder} required={required} aria-label={label} />
      </div>
      {generatedUrl && (
        <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="jc-generated-url">
          ↗ {generatedUrl}
        </a>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LIVE CARD PREVIEW
   ════════════════════════════════════════════════════════════ */
interface CardPreviewProps {
  name: string;
  batch: string;
  photoUrl: string | null;
  initial: string;
  github: string;
  linkedin: string;
  facebook: string;
  discord: string;
  codeforces: string;
  codechef: string;
  email: string;
}

function CardPreview({ 
  name, batch, photoUrl, initial,
  github, linkedin, facebook, discord, codeforces, codechef, email
}: CardPreviewProps) {
  const socials = [
    email      && { icon: <IconMail />, label: "Email", url: `mailto:${email}` },
    github     && { icon: <IconGH />, label: "GitHub", url: toGithubUrl(github) },
    linkedin   && { icon: <IconLI />, label: "LinkedIn", url: linkedin },
    discord    && { icon: <IconDiscord />, label: `Discord: @${discord}`, url: `https://discord.com` },
    facebook   && { icon: <IconFB />, label: "Facebook", url: facebook },
    codeforces && { icon: <IconCF />, label: "Codeforces", url: toCfUrl(codeforces) },
    codechef   && { icon: <IconCC />, label: "CodeChef", url: toCodechefUrl(codechef) },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; url: string }[];

  return (
    <div className="jc-preview-card">
      {/* Photo */}
      <div className="jc-preview-card__photo">
        {photoUrl ? (
          <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl} alt="preview"
              draggable={false}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", position: "absolute",
                top: 0, left: 0,
                transition: "none",
              }}
            />
          </div>
        ) : (
          <div className="jc-preview-card__placeholder">{initial || "?"}</div>
        )}
      </div>

      {/* Info */}
      <div className="jc-preview-card__content">
        <p className="jc-preview-card__name">{name || "Your Name"}</p>
        <p className="jc-preview-card__batch">{batch || "Your Batch"}</p>
        <p className="jc-preview-card__role">Club Member</p>
      </div>

      {/* Social footer */}
      {socials.length > 0 && (
        <div className="jc-preview-card__social-footer">
          {socials.map((s, i) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="jc-preview-card__social-cell" title={s.label}>
              {i > 0 && <span className="jc-preview-card__social-sep" aria-hidden="true" />}
              {s.icon}
            </a>
          ))}
        </div>
      )}

      <div className="jc-preview-card__badge">MEC CC</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function JoinPage() {
  const [form, setForm] = useState(initialForm);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // 1. Local Storage Draft
  useEffect(() => {
    const saved = localStorage.getItem("joinFormDraft");
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch(e) {
        console.error("Failed to parse form draft", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save draft and flash indicator
    if (form !== initialForm) {
      localStorage.setItem("joinFormDraft", JSON.stringify(form));
      setDraftSaved(true);
      const timer = setTimeout(() => setDraftSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [form]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoUrl(null);
      setPhotoBase64(null);
      setPhotoError(null);
      return;
    }
    
    // 2. File Size Validation (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setPhotoError("Photo is too large. Maximum allowed size is 5MB.");
      setPhotoUrl(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      // Validate that the image is a perfect square
      if (Math.abs(img.naturalWidth - img.naturalHeight) > 1) {
        setPhotoError("Photo must be perfectly squared (1:1 ratio). Please crop it before uploading.");
        setPhotoUrl(null);
        setPhotoBase64(null);
        if (fileRef.current) fileRef.current.value = "";
        return;
      }
      setPhotoError(null);
      setPhotoUrl(url);

      // Downscale and convert to base64
      const canvas = document.createElement("canvas");
      const MAX_DIM = 600; // max size to keep it under 300KB
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      if (width > MAX_DIM) {
        height = Math.round((height * MAX_DIM) / width);
        width = MAX_DIM;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        setPhotoBase64(base64);
      }
    };
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!photoUrl) {
      toast.error("Profile photo is required and must be a square.");
      return;
    }
    setSubmitting(true);
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Append all React state fields to formData (since some HTML inputs lack name attributes)
    Object.entries(form).forEach(([key, value]) => {
      formData.set(key, value);
    });
    
    // store resolved links for username fields
    formData.set("github_url",    toGithubUrl(form.github));
    formData.set("codeforces_url", toCfUrl(form.codeforces));
    formData.set("codechef_url",   toCodechefUrl(form.codechef));
    formData.set("whyJoin", "Member application via Join page");
    
    if (photoBase64) {
      formData.set("photo_base64", photoBase64);
    }

    const result = await submitJoinRequest({ success: false, message: "", errors: {} }, formData);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      localStorage.removeItem("joinFormDraft");
      toast.success("Application submitted successfully!");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#ec4899", "#3b82f6"]
      });
    } else {
      toast.error(result.message || "Failed to submit application.");
    }
  }, [form, photoUrl]);

  const initial = form.fullName.trim().charAt(0).toUpperCase();

  if (submitted) {
    return (
      <section className="section join-success">
        <div className="container container--narrow text-center">
          <div className="join-success__icon">✓</div>
          <h1>Application Received!</h1>
          <p className="join-success__message">
            Thanks, <strong>{form.fullName}</strong>! We&apos;ll review your request and get back to you via <strong>{form.email}</strong>.
          </p>
          <Button href="/" size="lg">Return Home</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section jc-page">
      <div className="container">

        <div className="jc-header">
          <span className="kicker">Join the Club</span>
          <h1>sudo adduser</h1>
          <p>Fill in your details and watch your member card come to life — live preview on the right.</p>
        </div>

        <div className="jc-layout">

          {/* ════ LEFT: FORM ════ */}
          <form className="jc-form" onSubmit={handleSubmit} noValidate>

            {/* — Section 01: Identity — */}
            <div className="jc-form__section">
              <div className="jc-form__section-header">
                <h2 className="jc-form__section-title">
                  <span className="jc-form__section-num">01</span> Identity
                </h2>
                <span className={`jc-draft-indicator ${draftSaved ? "jc-draft-indicator--visible" : ""}`}>
                  ✓ Draft saved locally
                </span>
              </div>

              {/* Photo upload */}
              <div className="jc-form__photo-row">
                <button type="button" className="jc-photo-upload-btn" onClick={() => fileRef.current?.click()} aria-label="Upload profile picture" aria-describedby="photo-hint">
                  {photoUrl
                    ? <Image src={photoUrl} alt="profile" fill style={{ objectFit: "cover" }} unoptimized />
                    : <div className="jc-photo-upload-btn__inner" aria-hidden="true">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span>Upload Photo</span>
                      </div>
                  }
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} aria-hidden="true" />
                <div id="photo-hint" className="jc-photo-upload-hint">
                  <p>Profile Photo <span className="jc-required" aria-hidden="true">*</span></p>
                  <div style={{ fontWeight: "bold", fontSize: "0.85rem", color: "var(--color-primary)" }}>
                    <p>Important requirements:</p>
                    <ul style={{ paddingLeft: "1.2rem", marginTop: "0.2rem", listStyleType: "disc" }}>
                      <li>Photo MUST be exactly squared (1:1 aspect ratio).</li>
                      <li>File size must be under 5MB.</li>
                    </ul>
                  </div>
                  {photoError && <p role="alert" style={{ fontSize: "0.85rem", color: "red" }}>{photoError}</p>}
                  {photoUrl && (
                    <button type="button" className="jc-photo-remove" aria-label="Remove uploaded photo"
                      onClick={() => { setPhotoUrl(null); if (fileRef.current) fileRef.current.value = ""; }}>
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <div className="jc-form-group">
                <label htmlFor="fullName">Full Name <span className="jc-required">*</span></label>
                <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={update} required placeholder="e.g. Tawhid Ahmmed" />
              </div>

              <div className="jc-form__row--2">
                <div className="jc-form-group">
                  <label htmlFor="studentId">Student ID <span className="jc-required">*</span></label>
                  <input id="studentId" name="studentId" type="text" value={form.studentId} onChange={update} required placeholder="e.g. 210321" />
                </div>
                <div className="jc-form-group">
                  <label htmlFor="registrationNumber">Registration No. <span className="jc-required">*</span></label>
                  <input id="registrationNumber" name="registrationNumber" type="text" value={form.registrationNumber} onChange={update} required placeholder="e.g. 1356" />
                </div>
              </div>

              <div className="jc-form__row--2">
                <div className="jc-form-group">
                  <label htmlFor="batch">Batch <span className="jc-required">*</span></label>
                  <input id="batch" name="batch" type="text" value={form.batch} onChange={update} required placeholder="e.g. CSE, 5th" />
                </div>
                <div className="jc-form-group">
                  <label htmlFor="email">Email <span className="jc-required">*</span></label>
                  <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="name@std.mec.edu.bd" />
                </div>
              </div>
            </div>

            {/* — Section 02: Social & Competitive — */}
            <div className="jc-form__section">
              <h2 className="jc-form__section-title">
                <span className="jc-form__section-num">02</span> Social &amp; Competitive Profiles
              </h2>

              {/* LinkedIn — full URL, required */}
              <div className="jc-form-group">
                <label htmlFor="linkedin">
                  <IconLI /> LinkedIn <span className="jc-required">*</span>
                </label>
                <input id="linkedin" name="linkedin" type="url" value={form.linkedin} onChange={update} required placeholder="https://linkedin.com/in/username" />
              </div>

              {/* GitHub username → auto link */}
              <PrefixInput
                id="github" name="github" icon={<IconGH />} label="GitHub" required
                prefix="github.com/" placeholder="username"
                value={form.github} onChange={update}
                generatedUrl={toGithubUrl(form.github)}
              />

              <div className="jc-form__row--2">
                {/* Codeforces handle → auto link */}
                <PrefixInput
                  id="codeforces" name="codeforces" icon={<IconCF />} label="Codeforces" required
                  prefix="codeforces.com/" placeholder="handle"
                  value={form.codeforces} onChange={update}
                  generatedUrl={toCfUrl(form.codeforces)}
                />
                {/* CodeChef username → auto link */}
                <PrefixInput
                  id="codechef" name="codechef" icon={<IconCC />} label="CodeChef" required
                  prefix="codechef.com/" placeholder="username"
                  value={form.codechef} onChange={update}
                  generatedUrl={toCodechefUrl(form.codechef)}
                />
              </div>

              {/* Discord username */}
              <PrefixInput
                id="discord" name="discord" icon={<IconDiscord />} label="Discord" required
                prefix="@" placeholder="username"
                value={form.discord} onChange={update}
              />

              {/* Facebook — full URL, optional */}
              <div className="jc-form-group">
                <label htmlFor="facebook">
                  <IconFB /> Facebook
                </label>
                <input id="facebook" name="facebook" type="url" value={form.facebook} onChange={update} placeholder="https://facebook.com/username" />
              </div>
            </div>

            <div className="jc-form__actions">
              <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Submitting…" : "Submit Application →"}
              </Button>
            </div>
          </form>

          {/* ════ RIGHT: LIVE PREVIEW ════ */}
          <div className="jc-preview-panel">
            <div className="jc-preview-panel__sticky">
              <div className="jc-preview-label">
                <span className="jc-preview-label__dot" />
                Live Preview
              </div>

              <CardPreview
                name={form.fullName} batch={form.batch}
                photoUrl={photoUrl} initial={initial}
                github={form.github} linkedin={form.linkedin}
                facebook={form.facebook} discord={form.discord} 
                codeforces={form.codeforces}
                codechef={form.codechef} email={form.email}
              />


              <p className="jc-preview-hint">
                This is how your member card will look on the club website.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
