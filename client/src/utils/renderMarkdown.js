const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inlineMd = (raw) =>
    esc(raw)
        .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
            '<img src="$2" alt="$1" style="max-width:100%;border-radius:10px;margin:10px 0;border:1px solid rgba(255,255,255,0.07);display:block"/>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noreferrer" style="color:#818cf8;text-decoration:underline">$1</a>')
        .replace(/\*\*([^*\n]+)\*\*/g,
            '<strong style="color:#e2e8f0;font-weight:700">$1</strong>')
        .replace(/\*([^*\n]+)\*/g,
            '<em style="color:#cbd5e1">$1</em>')
        .replace(/`([^`\n]+)`/g,
            '<code style="background:rgba(255,255,255,0.07);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:0.88em;color:#a5b4fc">$1</code>');

export function renderMarkdown(md) {
    if (!md) return '';
    const lines = md.split('\n');
    const out = [];
    let inCode = false, codeLines = [], inList = false, listType = '', listItems = [];

    const flushList = () => {
        if (!inList) return;
        const tag = listType === 'ul' ? 'ul' : 'ol';
        out.push(`<${tag} style="padding-left:20px;margin:8px 0">${listItems.map(li =>
            `<li style="margin:4px 0;color:#94a3b8;font-size:13px;line-height:1.7">${li}</li>`
        ).join('')}</${tag}>`);
        inList = false; listItems = [];
    };

    for (const line of lines) {
        if (line.startsWith('```')) {
            if (!inCode) { flushList(); inCode = true; codeLines = []; }
            else {
                inCode = false;
                out.push(`<pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;overflow-x:auto;margin:12px 0"><code style="font-family:monospace;font-size:12px;line-height:1.6;color:#94a3b8">${esc(codeLines.join('\n'))}</code></pre>`);
            }
            continue;
        }
        if (inCode) { codeLines.push(line); continue; }

        if (/^[-*+] /.test(line) || /^\d+\. /.test(line)) {
            const isUl = /^[-*+] /.test(line);
            const content = isUl ? line.slice(2) : line.replace(/^\d+\.\s+/, '');
            const nt = isUl ? 'ul' : 'ol';
            if (!inList) { inList = true; listType = nt; }
            else if (listType !== nt) { flushList(); inList = true; listType = nt; }
            listItems.push(inlineMd(content));
            continue;
        }
        flushList();

        if (line.startsWith('# '))
            out.push(`<h1 style="font-size:20px;font-weight:900;color:#f1f5f9;margin:4px 0 14px;letter-spacing:-0.4px">${inlineMd(line.slice(2))}</h1>`);
        else if (line.startsWith('## '))
            out.push(`<h2 style="font-size:14px;font-weight:800;color:#a5b4fc;margin:20px 0 8px;padding-left:10px;border-left:2px solid #4f46e5">${inlineMd(line.slice(3))}</h2>`);
        else if (line.startsWith('### '))
            out.push(`<h3 style="font-size:13px;font-weight:700;color:#94a3b8;margin:14px 0 5px">${inlineMd(line.slice(4))}</h3>`);
        else if (line.startsWith('> '))
            out.push(`<blockquote style="border-left:3px solid #4f46e5;padding:10px 14px;margin:12px 0;background:rgba(79,70,229,0.07);border-radius:0 10px 10px 0"><p style="color:#818cf8;margin:0;font-style:italic;font-size:13px;line-height:1.7">${inlineMd(line.slice(2))}</p></blockquote>`);
        else if (/^---+$/.test(line.trim()))
            out.push('<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:16px 0"/>');
        else if (line.trim() === '')
            out.push('<div style="height:6px"></div>');
        else
            out.push(`<p style="color:#94a3b8;margin:0 0 10px;font-size:13px;line-height:1.75">${inlineMd(line)}</p>`);
    }
    flushList();
    if (inCode && codeLines.length)
        out.push(`<pre style="background:rgba(255,255,255,0.04);padding:14px;border-radius:10px"><code style="font-family:monospace;font-size:12px;color:#94a3b8">${esc(codeLines.join('\n'))}</code></pre>`);
    return out.join('');
}
