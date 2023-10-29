export function SocialLinks() {
  const socialList = [
    {
      type: "facebook",
      link: "https://www.facebook.com",
      icon: "bi bi-facebook",
    },
    {
      type: "instagram",
      link: "https://www.instagram.com",
      icon: "bi bi-instagram",
    },
    {
      type: "phone",
      link: "tel:0505555555",
      icon: "bi bi-telephone-fill",
    },
    {
      type: "email",
      link: "mailto:office@mystore.com",
      icon: "bi bi-envelope-fill",
    },
  ];
  return (
    <div id="contactIcons">
      <ul id="contactList">
        {socialList.map((socialLink, index) => {
          return (
            <li key={index}>
              <a href={socialLink.link}>
                <i className={socialLink.icon}></i>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
