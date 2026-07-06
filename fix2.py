path = "src/features/auth/pages/VerificationPage.jsx"
with open(path, "r") as f:
    content = f.read()

broken = """                </div>
              </div>
              {/* Option 2 - WhatsApp Verification */}</div>
              </div>
              {/* Option 2 - WhatsApp Verification */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-slate-50/50 flex flex-col justify-between hover:shadow-md transition-shadow">"""

fixed = """                </div>
              </div>

              {/* Option 2 - WhatsApp Verification */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-slate-50/50 flex flex-col justify-between hover:shadow-md transition-shadow">"""

if broken in content:
    content = content.replace(broken, fixed)
    print("Patched successfully")
else:
    print("Pattern not found - need manual inspection")

with open(path, "w") as f:
    f.write(content)
