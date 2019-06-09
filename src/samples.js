/**
 * Samples objects as sent by the API.
 */

const NotificationsTypes = require('./notifications_types');

module.exports = {
  [NotificationsTypes.EXPENSE_CREATED]: {
    createdAt: '2019-06-04T19:15:30.364Z',
    id: 71360,
    type: 'collective.expense.created',
    CollectiveId: 10885,
    data: {
      fromCollective: {
        type: 'USER',
        name: 'Frank Zappa',
        image:
          'https://opencollective-staging.s3-us-west-1.amazonaws.com/40cf57a0-2fbf-11e9-85ef-e1ba4406e770.jpg',
        slug: 'frank-zappa',
      },
      expense: {
        id: 2481,
        currency: 'EUR',
        amount: 5500,
        description: "We'll have very expensive things",
      },
    },
  },
  [NotificationsTypes.MEMBER_CREATED]: {
    createdAt: '2019-06-04T19:15:30.364Z',
    id: 71360,
    type: 'collective.expense.created',
    CollectiveId: 10885,
    data: {
      member: {
        role: 'BACKER',
        description: null,
        since: '2019-06-09T16:24:55.336Z',
        memberCollective: {
          id: 10889,
          type: 'USER',
          slug: 'frank-zappa',
          name: 'Frank Zappa',
          company: null,
          website: null,
          twitterHandle: null,
          githubHandle: null,
          description: null,
          previewImage:
            'https://res.cloudinary.com/opencollective/image/fetch/c_thumb,g_face,h_48,r_max,w_48,bo_3px_solid_white/c_thumb,h_48,r_max,w_48,bo_2px_solid_rgb:66C71A/e_trim/f_jpg/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F1dc9505a6fb275e6c2d4685112620e6c%3Fdefault%3D404',
        },
      },
      order: {
        id: 6337,
        totalAmount: 1000,
        currency: 'USD',
        description: 'Monthly donation to Open Source Collective (Members)',
      },
    },
  },
  [NotificationsTypes.UPDATE_PUBLISHED]: {
    createdAt: '2019-06-04T19:47:44.206Z',
    id: 71361,
    type: 'collective.update.published',
    UserId: 9476,
    CollectiveId: 10885,
    data: {
      update: {
        html:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum ita sint, effectum est nihil esse malum, quod turpe non sit. Ille incendat? Et ille ridens: Video, inquit, quid agas; <strong>Facillimum id quidem est, inquam.</strong> <em>Duo Reges: constructio interrete.</em> Haec quo modo conveniant, non sane intellego. Atque ego: Scis me, inquam, istud idem sentire, Piso, sed a te opportune facta mentio est. Experiamur igitur, inquit, etsi habet haec Stoicorum ratio difficilius quiddam et obscurius. <strong>Summae mihi videtur inscitiae.</strong> -, sed ut hoc iudicaremus, non esse in iis partem maximam positam beate aut secus vivendi.</p><p>Tu autem inter haec tantam multitudinem hominum interiectam non vides nec laetantium nec dolentium? Is ita vivebat, ut nulla tam exquisita posset inveniri voluptas, qua non abundaret. Quod autem satis est, eo quicquid accessit, nimium est; Sic vester sapiens magno aliquo emolumento commotus cicuta, si opus erit, dimicabit. <em>Sed virtutem ipsam inchoavit, nihil amplius.</em> Quos nisi redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est.</p><ul><li>Sed ego in hoc resisto;</li><li>Quid, si reviviscant Platonis illi et deinceps qui eorum auditores fuerunt, et tecum ita loquantur?</li><li>His similes sunt omnes, qui virtuti student levantur vitiis, levantur erroribus, nisi forte censes Ti.</li><li>Quamquam tu hanc copiosiorem etiam soles dicere.</li></ul><p>Quae contraria sunt his, malane? <a href="http://loripsum.net/" target="_blank">Ergo id est convenienter naturae vivere, a natura discedere.</a> Quod autem satis est, eo quicquid accessit, nimium est; Atque haec ita iustitiae propria sunt, ut sint virtutum reliquarum communia. Sit enim idem caecus, debilis.</p>',
        slug: 'test',
        title: 'This update title will make you crazy',
        isPrivate: false,
        tags: null,
      },
    },
  },
};
