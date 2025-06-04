"use client";

function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export default function ScrollTopButton() {
  return (
    <div
      className="fixed bottom-1 right-1 border rounded-sm px-1 cursor-pointer"
      onClick={handleScrollToTop}
    >
      ⇑
    </div>
  );
}
