

const updateLog = await()=> { 
    req.session.userLeftActionToday =leftActions- 1;

      await logActionFile.addAction({
        id: uId,
        date: getDateToday(),
        maxActions: maxAction,
        actionAllowed: req.session.userLeftActionToday,
      });
}